const express = require("express");
const router = express.Router();

const productController = require("./../controllers/productControllers");
const auth = require("./../auth");
const User = require("../models/User");

//Create Product
router.post("/create", auth.verify,(req, res) => {
	let userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin){
		productController.createProduct(req.body).then(result => res.send(result))
	} else{
		res.send(false)
	}
})

//Retrieve all products
router.get("/all", auth.verify,(req, res) => {
	
	let userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin){
		productController.getAllProducts(userData).then( result => res.send(result))
	} else{
		res.send(false)
	}
    
})

//Retrieve all active products
router.get("/", (req, res) => {

    productController.activeProducts().then( result => res.send(result))
})

//Retrieve all men active products
router.get("/men", (req, res) => {

    productController.activeMenProducts().then( result => res.send(result))
})
//Retrieve all women active products
router.get("/women", (req, res) => {

    productController.activeWomenProducts().then( result => res.send(result))
})
//Retrieve all kids active products
router.get("/kids", (req, res) => {

    productController.activeKidsProducts().then( result => res.send(result))
})

//Retrieve Single Product
router.get("/:productId", (req, res) => {

	let paramsId = req.params.productId
	productController.getProductById(paramsId).then(result => res.send(result))
})

//Update Product
router.put("/:productId", auth.verify,(req, res) => {
	let userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin){
		productController.updateProduct(req.params.productId, req.body).then(result => res.send(result))
	} else{
		res.send(false)
	}
	
})

//Archive Product
router.put("/:productId/archive", auth.verify, (req, res) => {
	let userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin){
		productController.archiveProduct(req.params.productId).then(result => res.send(result))
	} else{
		res.send(false)
	}
})

router.put("/:productId/unarchive", auth.verify, (req, res) => {
	let userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin){
		productController.unarchiveProduct(req.params.productId).then(result => res.send(result))
	} else{
		res.send(false)
	}
})

// Delete Product
router.delete("/:productId/delete", auth.verify, (req, res) => {

	productController.deleteProductById(req.params.productId).then(result => res.send(result))
})

module.exports = router