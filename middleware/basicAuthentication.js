const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    //Get authentication header
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    //Get authentication token from header
    const token = authHeader.split(' ')[1];
    if (!token) {
        req.isAuth = false;
        return next();
    }
    
    //Decode token
    const decodedToken = Buffer.from(token, 'base64').toString('ascii');
    const [email, password] = decodedToken.split(':');

    //Check if user exists
    const user = await User.findOne({email: email});
    if (!user) {
        req.isAuth = false;
        return next();
    }

    //Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        req.isAuth = false;
        return next();
    }

    //Set user as authenticated
    req.isAuth = true;
    req.userId = user.id;
    next();
}