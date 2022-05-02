const Product = require("./../models/Product");
const Order = require("./../models/Order")
const User = require("./../models/User");

const auth = require("./../auth");


module.exports.checkout = (reqbody, userData) => {
    let id = userData.id
    return User.find({_id: id}).then((result, error) => {

        if (result[0].orders.length == 0){
            return `No items in cart`
        }else {

            let newOrder = new Order({
                userId: reqbody.userId,
                cart: reqbody.cart,
                total: reqbody.total,
            })
        
            return newOrder.save().then( (result, error) => {
                if(result){
                    return true
                } else {
                    return false
                }
            })
        }
    })


    
}

module.exports.getAllOrders = (userData) => {

    return Order.find().then( (result, error) => {
        if(result){
            return result
        } else {
            return false
        }
    })
}
module.exports.getMyOrders = (userData) => {

    let id = userData.id

    return Order.find({ userId: id }).then( (result, error) => {
        if(result){
            return result
        } else {
            return false
        }
    })
}