const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//Register new user
router.post('/register', async (req, res) => {
    try {
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });

        //Save the user
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) { 
        res.status(500).json(err.message);
    }
});

//login user
router.post('/login', async (req, res) => {
    try {
        //Find the user
        const user = await User.findOne({ email: req.body.email });
        !user ? res.status(404).json('User not found') : null;

        //Compare the password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword ? res.status(401).json('Invalid password') : null;

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;