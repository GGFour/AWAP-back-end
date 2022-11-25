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
        description:
            'The gridded data are a blend of the land-surface air temperature dataset and the sea-surface temperature anomalies relative to a 1961-1990 reference period. Data are available for each month from January 1850 onwards, on a 5 degree grid and as global and regional average time series. The dataset is a collaborative product of the Met Office Hadley Centre and the Climatic Research Unit at the University of East Anglia ',
        source: 'https://www.metoffice.gov.uk/hadobs/hadcrut5/',
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
        description:
            'Northern Hemisphere temperature reconstruction for the past 2,000 years by combining low-resolution proxies with tree-ring data, using a wavelet transform technique to achieve timescale-dependent processing of the data. Link to full case study, which includes data measurements description - https://www.nature.com/articles/nature03265',
        source: 'https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005',
        keys: {
            x: 'Year',
            y: 'T',
        },
        data: vis2,
    },
    {
        name: 'Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958',
        tablename: 'visualization3',
        description: `CO2 concentrations measurements made at the Mauna Loa Observatory reflect truth about our global atmosphere. The main reasons for that confidence are:
                        1. The Observatory near the summit of Mauna Loa, at an altitude of 3400 m, is well situated to measure air masses that are representative of very large areas.
                        2. All of the measurements are rigorously and very frequently calibrated.
                        3. Ongoing comparisons of independent measurements at the same site allow an estimate of the accuracy, which is generally better than 0.2 ppm.
                        Link - https://gml.noaa.gov/ccgg/about/co2_measurements.html `,
        source: 'https://gml.noaa.gov/ccgg/trends/data.html',
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
        description: `The CO2 records presented here are derived from three ice cores obtained at Law Dome, East Antarctica from 1987 to 1993. The Law Dome site satisfies many of the desirable characteristics of an ideal ice core site for atmospheric CO2 reconstructions including negligible melting of the ice sheet surface, low concentrations of impurities, regular stratigraphic layering undisturbed at the surface by wind or at depth by ice flow, and high snow accumulation rate. Further details on the site, drilling, and cores are provided in Etheridge et al. (1996), Etheridge and Wookey (1989), and Morgan et al (1997).`,
        source: 'https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat',
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
        description:
            'In January 1998, the collaborative ice-drilling project at the Russian Vostok station in East Antarctica yielded the deepest ice core ever recovered, reaching a depth of 3,623 m (Petit et al. 1997, 1999). ',
        source: 'https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2',
        keys: {
            x: 'Mean age of the air (yr BP)',
            y: 'CO2 concentration',
        },
        data: vis5,
    },
    {
        name: 'Ice core 800k year composite study CO2 measurements',
        tablename: 'visualization6',
        description:
            'The European Project for Ice Coring in Antarctica Dome ice core from Dome C (EDC) has allowed for the reconstruction of atmospheric CO2 concentrations for the last 800,000 years.',
        source: 'https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt',
        keys: {
            x: 'Age, gas, calendar years before present (y)',
            y: 'CO2 concentration (ppm)',
        },
        data: vis6,
    },
    {
        name: 'Evolution of global temperature over the past two million years',
        tablename: 'visualization7',
        description: `Here I present a spatially weighted proxy reconstruction of global temperature over the past 2 million years estimated from a multi-proxy database of over 20,000 sea surface temperature point reconstructions. Global temperature gradually cooled until roughly 1.2 million years ago and cooling then stalled until the present.`,
        source: 'http://carolynsnyder.com/papers/Snyder_Data_Figures.zip',
        keys: {
            x: 'Time (kyr BP)',
            y: '50%',
        },
        data: vis7,
    },
    {
        name: 'CO2 emissions by country',
        tablename: 'visualization8',
        description:
            'Stacked line chart showing CO2 emissions of each country from 1959 to 2021',
        source: 'https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D',
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
        description:
            'The pie chart shows the breakdown of global greenhouse gas emissions in 2016. This is the latest breakdown of global emissions by sector and its sub-sectors, published by Climate Watch and the World Resources Institute.',
        source: 'https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx',
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
        process.stdout.write(err.stack)
        process.stdout.write(row)
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
        process.stdout.write(err.stack)
        process.stdout.write(row)
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
        process.stdout.write(`table: ${conf.tablename} finished`)
    }

    process.exit(1)
}

load(config)
