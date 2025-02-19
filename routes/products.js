const { Category } = require('../models/category');
const {Product} = require('../models/product');
const express = require('express'); // Express.js je minimalan i fleksibilan web framework za Node.js koji omogućava brzo i jednostavno pravljenje backend API-ja i web aplikacija.
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');  // Multer je middleware za Express.js koji se koristi za upload fajlova

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const uploadOptions = multer({ storage: storage });

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

router.post(`/`, uploadOptions.single('image'), async (req, res) =>{
    const category = await Category.findById(req.body.category);
    if(!category)
    {
        return res.status(400).send('Invalid category');
    }
    const file = req.file;
    if(!file)
        {
            return res.status(400).send('No image in request');
        }
    const fileName = req.file.fileName
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
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

router.put(
    '/gallery-images/:id',
    uploadOptions.array('images', 10),
    async (req, res) => {
        try {
            if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(400).json({ message: 'Invalid Product ID' });
            }

            const files = req.files;
            if (!files || files.length === 0) {
                return res.status(400).json({ message: 'No images uploaded' });
            }

            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            const imagesPaths = files.map((file) => `${basePath}${file.filename}`);

            const product = await Product.findByIdAndUpdate(
                req.params.id,
                { images: imagesPaths },
                { new: true }
            );

            if (!product) {
                return res.status(500).json({ message: 'The gallery cannot be updated!' });
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
);

module.exports =router;