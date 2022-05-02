const express = require("express");
const router = express.Router();

const userController = require("./../controllers/userControllers");
const auth = require("./../auth");

router.post("/email-exists", (req, res) => {

	userController.checkEmail(req.body).then( result => res.send(result))
})

//Register
router.post("/register", (req, res) => {

    userController.register(req.body).then(result => res.send(result))
})

//Newsletter
router.post("/newsletter", (req, res) => {

    userController.newsletter(req.body).then(result => res.send(result))
})

//Get all users
router.get("/", (req, res) => {

    userController.getAllUsers().then( result => res.send(result))
})

//Login
router.post("/login", (req, res) => {

	userController.login(req.body).then(result => res.send(result))
})

//retrieve user information
router.get("/details", auth.verify, (req, res) => {

	let userData = auth.decode(req.headers.authorization)
	console.log(userData)

	userController.getProfile(userData).then(result => res.send(result))
})

//Set as Admin
router.put("/:userId/setAsAdmin", auth.verify, (req, res) => {
    let userData = auth.decode(req.headers.authorization)
    if(userData.isAdmin){
        userController.setAsAdmin(req.params.userId, userData).then(result => res.send(result))
    } else {
        res.send(false)
    }
    
})

//Orders
router.post("/addCart", auth.verify, (req, res) => {

	let userData = {
		userId: auth.decode(req.headers.authorization).id,
		productId: req.body.productId,
		productName: req.body.productName,
		price: req.body.price,
		quantity: req.body.quantity,
		size: req.body.size,
		img: req.body.img,
	}
	
	userController.checkout(userData).then(result => res.send(result))
})
//Remove From Cart
router.put("/removeFromCart", auth.verify, (req, res) => {

	let userData = {
		userId: auth.decode(req.headers.authorization).id,
		productId: req.body.productId,
		quantity: req.body.quantity,
		size: req.body.size,
		id: req.body.id
	}
	
	userController.removeFromCart(userData).then(result => res.send(result))
})
//Remove All Items From Cart

router.put("/removeCart", auth.verify, (req, res) => {

	let userData = {
		userId: auth.decode(req.headers.authorization).id,
		productId: req.body.productId,
		quantity: req.body.quantity,
		size: req.body.size,
		id: req.body.id
	}
	
	userController.removeCart(userData).then(result => res.send(result))
})


router.put("/editFromCart", auth.verify, (req, res) => {

	let userData = {
		userId: auth.decode(req.headers.authorization).id,
		productId: req.body.productId,
		quantity: req.body.quantity,
		size: req.body.size,
		id: req.body.id
	}
	
	userController.editFromCart(userData).then(result => res.send(result))
})

//Retrieve All Orders
router.get("/orders", auth.verify, (req, res) => {
    let userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin){
		userController.getAllOrders().then( result => res.send(result))
	} else{
		res.send(false)
	}
    
})

//Retrieve User Orders
router.get("/myOrders", auth.verify, (req, res) => {

    let userData = auth.decode(req.headers.authorization)
	userController.getOrders(userData).then(result => res.send(result))
})


module.exports = router;