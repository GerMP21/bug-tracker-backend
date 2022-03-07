const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const basicAuthentication = require('../middleware/basicAuthentication');

//Find user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//Update user by id
router.put('/:id', basicAuthentication, async (req, res) => {
    //Check if the user to update is the same as the user who is logged in or if the user is an admin
    if (req.userId == req.params.id || req.isAdmin) {
        //Check if the user want to update the role to admin
        if (req.body.role == 'Admin' && !req.isAdmin) {
            res.status(401).json('You cannot update the role to admin');
        }
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
        res.status(403).json('Forbidden');
    }
});

//Delete user by id
router.delete('/:id', basicAuthentication, async (req, res) => {
    //Check if the user to delete is the same as the user who is logged in or if the user is an admin
    if (req.userId == req.params.id || req.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(403).json('Forbidden');
    }
});

module.exports = router;