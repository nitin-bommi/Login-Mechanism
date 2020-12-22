const speakeasy =  require('speakeasy')
const qrcode = require('qrcode') 

var secret = speakeasy.generateSecret({
    name: "Chinnu"
})

console.log(secret)

qrcode.toDataURL(secret.otpauth_url, function(err, data){
    if (err) throw err;
    console.log(data)
})