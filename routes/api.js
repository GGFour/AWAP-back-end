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
        return res.status('500').json({ message: 'fuckoff' })
    }
})

/* GET visualization2 data */
router.get('/visualization2', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

/* GET visualization3 data */
router.get('/visualization3', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

/* GET visualization4 data */
router.get('/visualization4', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

/* GET visualization5 data */
router.get('/visualization5', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

/* GET visualization6 data */
router.get('/visualization6', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

/* GET visualization7 data */
router.get('/visualization7', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

/* GET visualization8 data */
router.get('/visualization8', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

/* GET visualization9 data */
router.get('/visualization9', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

module.exports = router
