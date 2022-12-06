/**
 * This file handles logic for getting the visualization data.
 */
const pool = require('../model/pool')

async function getVisualizationData(visId) {
    let visData = await pool.query(`SELECT * FROM visualizations WHERE id=$1`, [
        visId,
    ])
    let data = await pool.query(`SELECT * FROM ${visData.rows[0].table_name}`)
    let result = visData.rows[0]
    result['data'] = data.rows
    return result
}

async function getVisualizations() {
    let visualizationsData = await pool.query(
        `SELECT * FROM visualizations`,
        []
    )
    let visualizationsRows = visualizationsData.rows
    for (let i = 0; i < visualizationsRows.length; ++i) {
        let visualization = visualizationsRows[i]
        let data = await pool.query(`SELECT * FROM ${visualization.table_name}`)
        visualization['data'] = data.rows
    }
    return visualizationsRows
}

async function addDIYVisualization(username, configuration) {
    const data2Store = {
        username: username,
        configuration: configuration,
    }
    const res = await pool.query(
        `INSERT into custom_visualizations (configuration, user_id) VALUES ($1, (SELECT id FROM users WHERE username = $2)) RETURNING id`,
        [data2Store, username]
    )
    return res.rows[0].id
}

module.exports = {
    getVisualizationData,
    getVisualizations,
    addDIYVisualization,
}
