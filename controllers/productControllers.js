const Product = require("./../models/Product");
const User = require("./../models/User");

const auth = require("./../auth");

module.exports.createProduct = (reqBody) => {

    let newProduct = new Product({
        productName: reqBody.productName,
		img: reqBody.img,
        description: reqBody.description,
		categories: reqBody.categories,
        price: reqBody.price,
    })

    return newProduct.save().then( (result, error) => {
        if(result){
            return true
        } else {
            return false
        }
    })
}

module.exports.getAllProducts = (userData) => {

    return Product.find().then( (result, error) => {
        if(result){
            return result
        } else {
            return false
        }
    })
}

module.exports.activeProducts = (reqBody) => {

    return Product.find({isActive: true}).then( (result, error) => {
        if(result){
            return result
        } else {
            return error
        }
    })
}
module.exports.activeMenProducts = (reqBody) => {

	return Product.find({ categories: "men", isActive: true}).then( (result, error) => {
        if(result){
            return result
        } else {
            return error
        }
    })
}
module.exports.activeWomenProducts = (reqBody) => {

	return Product.find({ categories: "women", isActive: true}).then( (result, error) => {
        if(result){
            return result
        } else {
            return error
        }
    })
}
module.exports.activeKidsProducts = (reqBody) => {

	return Product.find({ categories: "kids", isActive: true}).then( (result, error) => {
        if(result){
            return result
        } else {
            return error
        }
    })
}

module.exports.getProductById = (params) => {

	return Product.findById(params).then( (result, error) => {
		
		if(result == null){
			return `Product does not exist`
		} else {
			
			if(result){
				return result
			} else {
				
				error
			}
		}
	})	
}

module.exports.updateProduct = (id, reqBody) => {
	const {productName, description, price, categories}= reqBody

	let updatedProduct = {
		productName: productName,
		description: description,
		categories: categories,
		price: price
	}

	return Product.findByIdAndUpdate(id, updatedProduct).then( (result, error) => {

		if(error){
			return error
		} else {
			return result
		}
	})
}

module.exports.archiveProduct = (params) => {

	return Product.findByIdAndUpdate(params, {isActive: false}).then( (result, error) => {

		if(result == null){
			return `Product does not exist`
		} else {
			if(result){
				return true
			} else {
				return false
			}
		}
	})
}
module.exports.unarchiveProduct = (params) => {

	return Product.findByIdAndUpdate(params, {isActive: true}).then( (result, error) => {

		if(result == null){
			return `Product does not exist`
		} else {
			if(result){
				return true
			} else {
				return false
			}
		}
	})
}

module.exports.deleteProductById = (id) => {

	return Product.findByIdAndDelete(id).then((result, error) => {

		if (result == null) {
			return `Product does not exist`
		} else {
			if (result) {
				return true
			} else {
				return error
			}
		}
	})
}