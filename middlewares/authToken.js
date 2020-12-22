require('dotenv').config();
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        console.log(process.env.JWT_SECRET);
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                // res.json({ decoded });
                req.decoded = decodedToken;
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

module.exports = { requireAuth };