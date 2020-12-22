const speakeasy = require('speakeasy')

var result = speakeasy.totp.verify({
    secret: '^SwNBxc.:CT:({,0J[A*bl<KbRrfHoJL',
    encoding: 'ascii',
    token: '065685'
})

console.log(result)