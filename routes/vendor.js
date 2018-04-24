const express = require('express');
const route = express.Router();
const Vendor = require('../db').Vendor;

// route.get('/addvendor', (req, res) => {
//     // if(req.user){
//     Vendor.create({
//             name: 'Dell'
//         })
//         .then((vendor) => {
//             res.status(200).send(vendor)
//         })
//         .catch((err) => res.status(500).send())
//     // }
//     // else{
//     //     res.status(500).send("you are not logged in")
//     // }
// });

route.get('/getvendors', (req, res) => {
    Vendor.findAll({
            attributes: ['id', 'name']
        })
        .then((vendors) => {
            res.status(200).send(vendors)
        })
        .catch((err) => {
            res.status(500).send()
        })
});

module.exports = route;