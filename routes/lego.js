var express = require('express');
const LegoModel = require('../models/LegoModel');
var router = express.Router();

router.get('/', async (req, res) => {
    var lego = await LegoModel.find()
    res.render('lego/listlego', { lego: lego })
});

//Add
router.get('/create', async (req, res) => {
    var lego = await LegoModel.find()
    res.render('lego/legoAdd', { lego: lego })
})

router.post('/create', async (req, res) => {
    var lego = req.body
    await LegoModel.create(lego)
        .then(console.log('create lego successfully'))
        .catch(err => console.log('error creating lego'))
    res.redirect('/lego')
})

// Edit
router.get('/update/:id', async (req, res) => {
    var id = req.params.id
    var lego = await LegoModel.findById(id)
    res.render('lego/legoEdit', { lego: lego })
})

router.post('/update/:id', async (req, res) => {
    const id = req.params.id
    var lego = req.body

    await LegoModel.findByIdAndUpdate(id, lego)
    console.log('update lego successfully')
    res.redirect('/lego')
})

//Delete
router.get('/delete/:id', async (req, res) => {
    var id = req.params.id
    await LegoModel.findByIdAndDelete(id)
        .then(() => console.log('delete successful'))
        .catch(err => console.log(err))
    res.redirect('/cars')
})

module.exports = router;