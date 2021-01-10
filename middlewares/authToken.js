const jwt = require('jsonwebtoken');

const requireAuth = async(req, res, next) => {
    try {
        const token = await req.headers['x-access-token'];
        //const token = req.cookies.jwt;

        // check json web token exists & is verified
        if (token) {
            // console.log(process.env.JWT_SECRET);
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    console.log(err.message);
                } else {
                    // res.json({ decoded });
                    console.log(decodedToken);
                    req.decoded = decodedToken;
                    next();
                }
            });
        } else {
            console.log('Token not found');
        }
    } catch(err) {
        console.error(err.message)
    }
    
};

module.exports = { requireAuth };