/**
 * This file contains routes for getting visualizations data
 */
let router = require('express').Router()
let {
    getVisualizationData,
    getVisualizations,
    addCustomVisualization,
    getCustomVisualizations,
    getCustomById,
    deleteCustomVisualization,
} = require('../controllers/visualizations')
const authorizer = require('../middleware/authorizer')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 50,
})

router.use(limiter)

/* GET visualizations data */
router.get('/visualizations', async function (req, res, next) {
    try {
        let data = await getVisualizations()
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization x data */
router.get('/visualization', async function (req, res, next) {
    try {
        let data = await getVisualizationData(req.query.id)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* POST user specific visualization configuration */
router.post('/custom', authorizer, async function (req, res, next) {
    try {
        const id = await addCustomVisualization(
            req.user.username,
            req.body.configuration
        )
        return res.status('200').json({ message: 'OK', id: id })
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})
/* GET a specific custom visualization by id */
router.get('/custom', async function (req, res, next) {
    try {
        const data = await getCustomById(req.query.id)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})
/* DELETE custom visualization */
router.delete('/custom', authorizer, async function (req, res, next) {
    try {
        const id = await deleteCustomVisualization(
            req.query.id,
            req.user.username
        )
        return res.status('200').json({ message: 'OK', id: id })
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET all custom visualizations created by user */
router.get('/listcustom', authorizer, async function (req, res, next) {
    try {
        const data = await getCustomVisualizations(req.user.id)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

module.exports = router
