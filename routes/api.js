/**
 * This file contains routes for getting visualizations data
 */
let express = require('express')
let getVisualizationData = require('../controllers/visualizations')
let router = express.Router()

/* GET visualizations data */
router.get('/visualizations', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

/* GET visualization1 data */
router.get('/visualization1', async function (req, res, next) {
    try {
        let data = await getVisualizationData(1)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization2 data */
router.get('/visualization2', async function (req, res, next) {
    try {
        let data = await getVisualizationData(2)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization3 data */
router.get('/visualization3', async function (req, res, next) {
    try {
        let data = await getVisualizationData(3)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization4 data */
router.get('/visualization4', async function (req, res, next) {
    try {
        let data = await getVisualizationData(4)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization5 data */
router.get('/visualization5', async function (req, res, next) {
    try {
        let data = await getVisualizationData(5)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization6 data */
router.get('/visualization6', async function (req, res, next) {
    try {
        let data = await getVisualizationData(6)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization7 data */
router.get('/visualization7', async function (req, res, next) {
    try {
        let data = await getVisualizationData(7)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization8 data */
router.get('/visualization8', async function (req, res, next) {
    try {
        let data = await getVisualizationData(8)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization9 data */
router.get('/visualization9', async function (req, res, next) {
    try {
        let data = await getVisualizationData(9)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

module.exports = router
