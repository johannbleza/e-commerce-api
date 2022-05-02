const jwt = require("jsonwebtoken");
const key = "eCommerceAPI";


module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
		cart: user.orders
    }

    return jwt.sign(data, key, {});
}

module.exports.verify = (req, res, next) => {
	//get the token in the headers authorization
	let token = req.headers.authorization

	if(typeof token !== "undefined"){
		
		token = token.slice(7, token.length)

		//jwt.verify(token, secret, cb(error, data))
		return jwt.verify(token, key, (err, data) => {
			if(err){
				return res.send(false)
			} else {
				next()
			}
		})
	}
}


module.exports.decode = (token) => {

	if(typeof token != "undefined"){
		token = token.slice(7, token.length)

		return jwt.verify(token, key, (err, data) => {
			if(err){
				return null
			} else {
				return jwt.decode(token, {complete: true}).payload
			}
		})
	}
}
