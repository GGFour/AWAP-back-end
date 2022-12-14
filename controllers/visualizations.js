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

async function addCustomVisualization(username, configuration) {
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

async function getCustomVisualizations(username) {
    let customVisData = await pool.query(
        `SELECT * FROM custom_visualizations WHERE user_id=(SELECT id FROM users WHERE username=$1)`,
        [username]
    )

    return customVisData.rows
}
async function getCustomById(id) {
    let customVisData = await pool.query(
        `SELECT * FROM custom_visualizations WHERE id=$1`,
        [id]
    )
    if (customVisData.rows.length == 0) {
        throw new Error('Visualization does not exist')
    }
    return customVisData.rows[0].configuration
}

async function deleteCustomVisualization(visid, username) {
    let deletedCustom = await pool.query(
        'DELETE FROM custom_visualizations WHERE id=$1 AND user_id=(SELECT id FROM users WHERE username=$2) RETURNING id',
        [visid, username]
    )
    if (deletedCustom.rows.length == 0) {
        throw new Error('Visualization does not exist')
    }
    return deletedCustom.rows[0].id
}

module.exports = {
    getVisualizationData,
    getVisualizations,
    addCustomVisualization,
    getCustomVisualizations,
    deleteCustomVisualization,
    getCustomById,
}
