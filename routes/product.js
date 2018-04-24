const express = require('express');
const route = express.Router();
const Product = require('../db').Product;
const Cart = require('../db').Cart;
const Vendor = require('../db').Vendor;

route.post('/addproduct', (req, res) => {
    // apply condition before proceed
    // check whether the user is admin or not
    let newProduct = req.body;
    Product.create(newProduct)
        .then(product => {
            res.status(200).send({
                success: true
            });
        })
        .catch((err) => {
            res.status(500).send({
                success: false
            });
        })
});

route.get('/getProducts', (req, res) => {
    console.log("req user", req.user);
    if (!(req.user)) {
        res.status(500).send({
            success: false
        })
    }
    Product.findAll({
            attributes: ['id', 'name', 'price', 'vendorId']
        })
        .then((products) => {
            res.status(200).send({
                success: true,
                products: products
            });
        })
        .catch((err) => {
            res.status(500).send({
                success: false
            })
        })

});

route.get('/getProductsByVendor', (req, res) => {
    Product.findAll({
            where: {
                vendorId: req.query.id
            }
        })
        .then((products) => {
            res.status(200).send(products);
        })
        .catch((err) => {
            res.status(500).send({
                success: false
            })
        })
});

route.post('/addToCart', (req, res) => {
    let cartItem = req.body;
    cartItem.userId = req.user.dataValues.id;

    Cart.findOne({
            where: {
                vendorId: req.body.vendorId,
                productId: req.body.productId,
                userId: req.user.dataValues.id
            }
        })
        .then((cart) => {
            // if already exist then just update the quantiy
            cart.quantity++;
            cart.save();
        })
        .catch((error) => {
            // if not exist already
            Cart.create(cartItem)
                .then(cart => {
                    res.status(200).send({
                        success: true
                    })
                })
                .then((err) => {
                    res.status(500).send({
                        success: false
                    })
                })
        })
});

route.get('/showcart', (req, res) => {
    // console.log("user id", req.user.dataValues.id)
    Cart.findAll({
            where: {
                userId: req.user.dataValues.id
            },
            include: [{
                all: true
            }]
        })
        .then((carts) => {
            // console.log("hi",carts)
            res.status(200).send({
                success: true,
                cartItems: carts
            })
        })
        .catch((error) => {
            res.status(500).send({
                success: false
            })
        })
});

route.get('/cart', (req, res) => {
    console.log("cart page called")
    res.render('cart');
})
route.post('/increaseQuantityOfProduct', (req, res) => {
    let cartId = req.body.id;
    Cart.findOne({
            where: {
                id: cartId
            }
        })
        .then((cart) => {
            Cart.update({
                    quantity: cart.quantity + 1
                }, {
                    where: {
                        id: cart.id
                    }
                })
                .then((cart) => {
                    res.status(200).send({
                        success: true
                    })
                })
                .catch((error) => {
                    res.status(500).send({
                        success: false
                    })
                })
        })
        .catch((error) => {
            res.status(500).send({
                success: false
            })
        })
});

route.post('/decreaseQuantityOfProduct', (req, res) => {
    let cartId = req.body.id;
    Cart.findOne({
            where: {
                id: cartId
            }
        })
        .then((cart) => {
            if (cart.quantity == 1) {
                Cart.destroy({
                        where: {
                            id: cart.id
                        }
                    })
                    .then(() => {
                        res.status(200).send({
                            success: true
                        })
                    })
                    .catch((error) => {
                        res.status(500).send({
                            success: false
                        })
                    })
            } else {
                Cart.update({
                        quantity: cart.quantity - 1
                    }, {
                        where: {
                            id: cart.id
                        }
                    })
                    .then((cart) => {
                        res.status(200).send({
                            success: true
                        })
                    })
                    .catch((error) => {
                        res.status(500).send({
                            success: false
                        })
                    })
            }

        })
        .catch((error) => {
            res.status(500).send({
                success: false
            })
        })
});

module.exports = route;