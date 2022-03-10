const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    //Get authentication header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next();
    }

    //Get authentication token from header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next();
    }
    
    //Decode token
    const decodedToken = Buffer.from(token, 'base64').toString('ascii');
    const [email, password] = decodedToken.split(':');

    //Check if user exists
    const user = await User.findOne({email: email});
    if (!user) {
        return next();
    }

    //Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next();
    }

    //Set user as authenticated
    req.userId = user.id;
    req.isAdmin = user.role == 'Admin';
    next();
}