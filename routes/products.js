const { Category } = require('../models/category');
const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) =>{

    let filter = {}
    if(req.query.categories)
    {
        filter = {category: req.query.categories.split(',')};
    }
    const productList = await Product.find(filter).populate('category');

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

router.get(`/:id`, async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('category');
// populate koristimo kada zelimo da izdvojimo sve parametre odredjenog modela, u ovom slucaju nece prikazati samo ide, vec i ostale parametre

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product);
})

router.post(`/`, async (req, res) =>{
    const category = await Category.findById(req.body.category);
    if(!category)
    {
        return res.status(400).send('Invalid category');
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })

    product = await product.save();
    if(!product)
        return res.status(500).send('The product cannot be created');

    res.send(product);
    
})

router.put(`/:id`, async (req, res) =>{
    if(!mongoose.isValidObjectId(req.params.id))  // Priovjeravamo da li je prosledjeni id validan
    {
        res.status(400).send('Invalid product id');
    }
    const category = await Category.findById(req.body.category);
    if(!category)
    {
        return res.status(400).send('Invalid category');
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id, // id
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        { new: true } // response - ovo oznacava da zelim da vratim izmjenjeni response
    );
    if(!product)
        res.status(400).json({success: false, message: 'Bad request'})

    res.status(200).send(product);
})

router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
        if(product){
            return res.status(200).json({success: true, message: 'The product is deleted'})
        }
        else {
            return res.status(404).json({success: false, message: 'The product is not found'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err })        
    })
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments() /// funkcija koja se u mongo bazi koristi za prebrojavanje 

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send(
        {
            productCount: productCount
        });
})

router.get(`/get/featured/:count`, async (req, res) =>{ // daj mi samo tri featured proizvoda
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);  /// dodavanjem + pretvaramo string u numeric
                                                                /// limit funkcija kaze daj mi samo najvise count proizvoda
    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

module.exports =router;