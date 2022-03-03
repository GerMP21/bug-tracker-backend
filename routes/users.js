const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//GET request for users
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//PUT request for users
router.put('/:id', async (req, res) => {
    if (req.body.id == req.params.id) {
        //Hash the password
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                res.status(500).json(err.message);
            }
        }
        //Update the user
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(403).json('Unauthorized');
    }
});

//DELETE request for users
router.delete('/:id', async (req, res) => {
    if (req.body.id == req.params.id) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(403).json('Unauthorized');
    }
});

module.exports = router