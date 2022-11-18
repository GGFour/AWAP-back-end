require('dotenv').config()
const vis1 = require('./vis1/vis1.json')
const vis2 = require('./vis2.json')
const vis31 = require('./vis3/annualMeanCO2.json')
const vis32 = require('./vis3/monthlyMeanCO2.json')
const vis4 = require('./vis4/vis4.json')
const vis5 = require('./vis5/vis5.json')
const vis6 = require('./vis6.json')
const vis7 = require('./vis7/temperature.json')
const vis8 = require('./vis8/vis8.json')
const vis9 = require('./vis9.json')

const { Client } = require('pg')

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
})

function getVis3(monthly, yearly) {
    return monthly
        .map((e) => ({
            date: `${String(e.year).padStart(4, '0')}-${String(
                e.month
            ).padStart(2, '0')}`,
            mean: e['monthly average'],
            annual: false,
        }))
        .concat(
            yearly.map((e) => ({
                date: `${String(e.year).padStart(4, '0')}`,
                mean: e.mean,
                annual: true,
            }))
        )
}

let config = [
    {
        name: 'Global historical surface temperature anomalies from January 1850 onwards',
        tablename: 'visualization1',
        description: '',
        source: '',
        keys: {
            x: 'Time',
            y: 'Anomaly (deg C)',
            annual: 'Annual',
            hemisphere: 'Hemisphere',
        },
        data: vis1,
    },
    {
        name: 'Northern Hemisphere 2,000-year temperature reconstruction',
        tablename: 'visualization2',
        description: '',
        source: '',
        keys: {
            x: 'Year',
            y: 'T',
        },
        data: vis2,
    },
    {
        name: 'Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958',
        tablename: 'visualization3',
        description: '',
        source: '',
        keys: {
            x: 'date',
            y: 'mean',
            annual: 'annual',
        },
        data: getVis3(vis32, vis31),
    },
    {
        name: 'Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements',
        tablename: 'visualization4',
        description: '',
        source: '',
        keys: {
            x: 'airAgeAD',
            y: 'CO2MixingRatioPpm',
            sample_id: 'iceId',
        },
        data: vis4,
    },
    {
        name: 'Vostok Ice Core CO2 measurements, 417160 - 2342 years',
        tablename: 'visualization5',
        description: '',
        source: '',
        keys: {
            x: 'Mean age of the air (yr BP)',
            y: 'CO2 concentration',
        },
        data: vis5,
    },
    {
        name: 'Ice core 800k year composite study CO2 measurements',
        tablename: 'visualization6',
        description: '',
        source: '',
        keys: {
            x: 'Age, gas, calendar years before present (y)',
            y: 'CO2 concentration (ppm)',
        },
        data: vis6,
    },
    {
        name: 'Evolution of global temperature over the past two million years',
        tablename: 'visualization7',
        description: '',
        source: '',
        keys: {
            x: 'Time (kyr BP)',
            y: '50%',
        },
        data: vis7,
    },
    {
        name: 'CO2 emissions by country',
        tablename: 'visualization8',
        description: '',
        source: '',
        keys: {
            x: 'year',
            y: 'CO2_Mt',
            country: 'country',
        },
        data: vis8,
    },
    {
        name: 'CO2 emissions by sectors',
        tablename: 'visualization9',
        description: '',
        source: '',
        keys: {
            sector: 'Sector',
            subsector: 'Sub-sub-sector',
            val: 'Share of global greenhouse gas emissions (%)',
        },
        data: vis9,
    },
]
async function processRow(row, client, conf, keymap, keys, parameters) {
    for (let k = 0; k < keys.length; ++k) {
        let origKey = keymap[keys[k]]
        if (['date', 'Time', 'airAgeAD'].includes(origKey)) {
            const date = new Date(Date.parse(row[origKey]))
            row[origKey] = date.toDateString()
        }
        if (origKey == 'Year') {
            const date = new Date(
                Date.parse(String(row[origKey]).padStart(4, '0'))
            )
            row[origKey] = date.toDateString()
        }
    }

    const query = `INSERT INTO ${
        conf.tablename
    } (${keys.join()}) values(${parameters.join()})`
    try {
        await client.query(
            query,
            keys.map((key) => row[keymap[key]])
        )
    } catch (err) {
        process.out.writeln(err.stack)
        process.out.writeln(row)
        process.exit(1)
    }
}

async function insertIntoVisualisations(client, conf) {
    const query = `INSERT INTO visualizations (name, description, table_name, source) VALUES ($1,$2,$3,$4)`
    try {
        await client.query(query, [
            conf.name,
            conf.description,
            conf.tablename,
            conf.source,
        ])
    } catch (err) {
        process.out.writeln(err.stack)
        process.out.writeln(row)
        process.exit(1)
    }
}

async function load(config) {
    await client.connect()
    for (let i = 0; i < config.length; ++i) {
        let conf = config[i]
        let keymap = conf.keys
        let keys = Object.keys(keymap)
        let parameters = keys.reduce(
            (prev, curr, idx) => [...prev, '$' + (idx + 1)],
            []
        )
        for (let j = 0; j < conf.data.length; ++j) {
            let row = conf.data[j]
            await processRow(row, client, conf, keymap, keys, parameters)
        }
        insertIntoVisualisations(client, conf)
        process.out.writeln(`table: ${conf.tablename} finished`)
    }

    process.exit(1)
}

load(config)
