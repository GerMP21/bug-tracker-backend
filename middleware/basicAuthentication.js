const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    //Get authentication header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json('Unauthorized');
    }

    //Get authentication token from header
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json('Unauthorized');
    }
    
    //Decode token
    const decodedToken = Buffer.from(token, 'base64').toString('ascii');
    const [email, password] = decodedToken.split(':');

    //Check if user exists
    const user = await User.findOne({email: email});
    if (!user) {
        res.status(404).json('User not found');
    }

    //Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        res.status(403).json('Forbidden: Incorrect password');
    }

    //Set user as authenticated
    req.userId = user.id;
    req.isAdmin = user.role == 'Admin';
    next();
}