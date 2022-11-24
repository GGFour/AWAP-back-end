/**
 * This file handles logic for getting the visualization data.
 */
const pool = require('../model/pool')

async function getVisualizationData(visId = 1) {
    let visData = await pool.query(`SELECT * FROM visualizations WHERE id=$1`, [
        visId,
    ])
    let data = await pool.query(`SELECT * FROM visualization${visId}`)
    let result = visData.rows[0]
    result['data'] = data.rows
    return result
}

module.exports = getVisualizationData
