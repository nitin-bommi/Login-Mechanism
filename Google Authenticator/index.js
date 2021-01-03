const speakeasy =  require('speakeasy')
const bcrypt = require('bcrypt');
const User = require("./models/User");
async function gAuthenticate(username, password){
    const hash = bcrypt.hashSync(password, 10);
    // const decrypt = bcrypt.compareSync(password, hash);
    var secret = speakeasy.generateSecret({
        name: username
    })

    const user = new User({
        username,
        password: hash,
        secret:{
            ascii: secret.ascii,
            imageURL: secret.otpauth_url
        }
    });
    try {
        const savedUser = await user.save();
        console.log("Successfully written to DB");
    } catch (error) {
        console.log(error);
    }
}

function gValidate(otp, ascii){
    var result = speakeasy.totp.verify({
        secret: ascii,
        encoding: 'ascii',
        token: otp
    });
    return result;
}
module.exports = {gAuthenticate, gValidate};