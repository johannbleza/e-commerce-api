const User = require("./../models/User");
const Product = require("./../models/Product")
const Newsletter = require("./../models/Newsletter")

const bcrypt = require("bcrypt");
const auth = require("./../auth");

module.exports.register = (reqBody) => {
	const {email} = reqBody

	return User.findOne({email: email}).then( (result, error) => {
		if(result != null){
			return false
		} else {
			let newUser = new User({
				firstName: reqBody.firstName,
				lastName: reqBody.lastName,
				mobileNo: reqBody.mobileNo,
				email: reqBody.email,
				password: bcrypt.hashSync(reqBody.password, 10)
			})
		
			return newUser.save().then( (result, error) => {
				if(result){
					return true
				} else {
					return false
				}
			})
		}
	})
}
module.exports.newsletter = (reqBody) => {
	const {email} = reqBody

	return Newsletter.findOne({email: email}).then( (result, error) => {
		if(result != null){
			return false
		} else {

			let newNewsletter = new Newsletter({
				email: reqBody.email,
			})
		
			return newNewsletter.save().then( (result, error) => {
				if(result){
					return true
				} else {
					return false
				}
			})
		}
	})
}


module.exports.getAllUsers = () => {
    
    return User.find().then( (result, error) => {
        if(result){
            return result
        } else {
            return error
        }
    })
}

module.exports.login = (reqBody) => {
	const {email, password} = reqBody;

	return User.findOne({email: email}).then( (result, error) => {

		if(result == null){
			return false
		} else {
			let isPasswordCorrect = bcrypt.compareSync(password, result.password)

			if(isPasswordCorrect == true){
				return {access: auth.createAccessToken(result)}
			} else {
				return false
			}
		}
	})
}

module.exports.getProfile = (data) => {
	const { id } = data

	return User.findById(id).then((result, err) => {


		if (result != null) {
			result.password = "";
			return result
		} else {
			return false
		}
	})
}

module.exports.setAsAdmin = (params) => {

    return User.findByIdAndUpdate(params, {isAdmin: true}).then( (result, error) => {

        if(result == null){
            return `User does not exist`
        } else {
            if(result){
                return true
            } else {
                return false
            }
        }
    })
}

module.exports.checkout = async (data) => {
	const { userId, productId, productName, price, quantity,size, img} = data


	const userCheckout = await User.findById(userId).then( (result, err) => {
		if(err){
			return err
		} else {

			// console.log(quantity)
			cart = result.orders
			console.log(cart)

			if (cart.some(item => item.productId === productId) && cart.some(item => item.size === size)){
					for (let i = 0; i < cart.length; i++) {
						if (cart[i].productId === productId && cart[i].size === size) {
							console.log(cart[i])
							cart[i].quantity += quantity
						}
					}
				
			} else {

				result.orders.push({productId, productName, price, quantity, size, img})
			}
			

			
			
			
			

			if(result.orders.productId != productId){
				return result.save().then((result, err) => {
					if(err){
						return err
					} else {
						return result
					}
				})
			} else {
				return false
			}
		}
	})

	if(userCheckout){
		return true
	} else {
		return false
	}
}

module.exports.removeFromCart = async (data) => {
	const {userId, productId, quantity, size, id} = data

	const userCheckout = await User.findById(userId).then( (result, err) => {
		if(err){
			return err
		} else {

			const cart = result.orders

			console.log(cart[0]._id.valueOf() === id)

			for (var i = 0; i < cart.length; i++) {

				if (cart[i]._id.valueOf() === id) {

					cart.splice(i, 1);
				}

			}


			if(result.orders.productId != productId){
				return result.save().then((result, err) => {
					if(err){
						return err
					} else {
						return result
					}
				})
			} else {
				return false
			}
		}
	})

	if(userCheckout){
		return true
	} else {
		return false
	}
}
module.exports.removeCart = async (data) => {
	const {userId, productId, quantity, size, id} = data

	const userCheckout = await User.findById(userId).then( (result, err) => {
		if(err){
			return err
		} else {

			const cart = result.orders

			console.log(result)

			cart.splice(0,cart.length)


			return result.save().then((result, err) => {
				if (err) {
					return err
				} else {
					return result
				}
			})
		}
	})

	if(userCheckout){
		return true
	} else {
		return false
	}
}

module.exports.editFromCart = async (data) => {
	const {userId, productId, quantity, size, id} = data

	const userCheckout = await User.findById(userId).then( (result, err) => {
		if(err){
			return err
		} else {

			const cart = result.orders

			for(let i = 0; i < cart.length; i++){

				if (cart[i]._id.valueOf() === id){
					cart[i].quantity = quantity
					cart[i].size = size
				}
			}


			if(result.orders.productId != productId){
				return result.save().then((result, err) => {
					if(err){
						return err
					} else {
						return result
					}
				})
			} else {
				return false
			}
		}
	})

	if(userCheckout){
		return true
	} else {
		return false
	}
}


module.exports.getAllOrders = () => {

    return User.find({__v: {$gt: 0}}).then( (result, error) => {

        if(result){
            return result
        } else {
            return error
        }
    })
}

module.exports.getOrders = (data) => {
	// console.log(data)
	const {id} = data

	return User.findById(id).then((result, err) => {
		// console.log(result)

		if(result != null){
			result.password = "";
			return result.orders
		} else {
			return false
		}
	})
}