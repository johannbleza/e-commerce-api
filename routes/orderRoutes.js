const express = require("express");
const router = express.Router();

const orderControllers = require("./../controllers/orderControllers");
const auth = require("./../auth");
const User = require("../models/User");


//Add to Cart
router.post("/addCart", auth.verify, (req, res) => {

	let userData = auth.decode(req.headers.authorization)

	orderControllers.addToCart(req.body, userData).then(result => res.send(result))
})

//Checkout
router.post("/checkout", auth.verify,(req, res) => {
	let userData = auth.decode(req.headers.authorization)
		orderControllers.checkout(req.body, userData).then(result => res.send(result))
})

//Retrieve All Orders
router.get("/", auth.verify,(req, res) => {
	
	let userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin){
		orderControllers.getAllOrders(userData).then( result => res.send(result))
	} else{
		res.send(false)
	}
    
})
//Retrieve My Orders
router.get("/order-history", auth.verify,(req, res) => {

	let userData = auth.decode(req.headers.authorization)
	
	orderControllers.getMyOrders(userData).then( result => res.send(result))
    
})

module.exports = router;