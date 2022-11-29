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

module.exports = { getVisualizationData, getVisualizations }
