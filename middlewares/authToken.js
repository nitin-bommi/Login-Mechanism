const jwt = require('jsonwebtoken');

const requireAuth = async(req, res, next) => {
    try {
<<<<<<< HEAD
        const token = await req.headers['x-access-token'];
=======
        const token=await req.headers['x-access-token'];
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
        //const token = req.cookies.jwt;

        // check json web token exists & is verified
        if (token) {
<<<<<<< HEAD
            // console.log(process.env.JWT_SECRET);
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    console.log(err);
=======
            console.log(process.env.JWT_SECRET);
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
                    console.log(err.message);
                    res.redirect('/api/checkid');
                } else {
                    // res.json({ decoded });
                    console.log(decodedToken);
                    req.decoded = decodedToken;
                    next();
                }
            });
        } else {
            res.redirect('/api/checkid');
        }
    } catch(err) {
        console.error(err.message)
    }
    
};

module.exports = { requireAuth };