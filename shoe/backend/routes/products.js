// const { Product } = require('../models/product');
// const express = require('express');
// const { Category } = require('../models/category');
// const router = express.Router();
// const mongoose = require('mongoose');
// const multer = require('multer');

// const FILE_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg',
// };

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const isValid = FILE_TYPE_MAP[file.mimetype];
//         let uploadError = new Error('invalid image type');

//         if (isValid) {
//             uploadError = null;
//         }
//         cb(uploadError, 'public/uploads');
//     },
//     filename: function (req, file, cb) {
//         const fileName = file.originalname.split(' ').join('-');
//         const extension = FILE_TYPE_MAP[file.mimetype];
//         cb(null, `${fileName}-${Date.now()}.${extension}`);
//     },
// });

// const uploadOptions = multer({ storage: storage });

// router.get(`/`, async (req, res) => {
//     let filter = {};
//     if (req.query.categories) {
//         filter = { category: req.query.categories.split(',') };
//     }

//     const productList = await Product.find(filter).populate('category');

//     if (!productList) {
//         res.status(500).json({ success: false });
//     }
//     res.send(productList);
// });

// router.get(`/:id`, async (req, res) => {
//     const product = await Product.findById(req.params.id).populate('category');

//     if (!product) {
//         res.status(500).json({ success: false });
//     }
//     res.send(product);
// });

// router.post(`/`, uploadOptions.single('image'), async (req, res) => {
//     const category = await Category.findById(req.body.category);
//     if (!category) return res.status(400).send('Invalid Category');

//     const file = req.file;
//     if (!file) return res.status(400).send('No image in the request');

//     const fileName = file.filename;
//     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
//     let product = new Product({
//         name: req.body.name,
//         description: req.body.description,
//         richDescription: req.body.richDescription,
//         image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
//         brand: req.body.brand,
//         price: req.body.price,
//         category: req.body.category,
//         countInStock: req.body.countInStock,
//         rating: req.body.rating,
//         numReviews: req.body.numReviews,
//         isFeatured: req.body.isFeatured,
//     });

//     product = await product.save();

//     if (!product) return res.status(500).send('The product cannot be created');

//     res.send(product);
// });

// router.put('/:id', uploadOptions.single('image'), async (req, res) => {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//         return res.status(400).send('Invalid Product Id');
//     }
//     const category = await Category.findById(req.body.category);
//     if (!category) return res.status(400).send('Invalid Category');

//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(400).send('Invalid Product!');

//     const file = req.file;
//     let imagepath;

//     if (file) {
//         const fileName = file.filename;
//         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
//         imagepath = `${basePath}${fileName}`;
//     } else {
//         imagepath = product.image;
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//             name: req.body.name,
//             description: req.body.description,
//             richDescription: req.body.richDescription,
//             image: imagepath,
//             brand: req.body.brand,
//             price: req.body.price,
//             category: req.body.category,
//             countInStock: req.body.countInStock,
//             rating: req.body.rating,
//             numReviews: req.body.numReviews,
//             isFeatured: req.body.isFeatured,
//         },
//         { new: true }
//     );

//     if (!updatedProduct)
//         return res.status(500).send('the product cannot be updated!');

//     res.send(updatedProduct);
// });

// router.delete('/:id', (req, res) => {
//     Product.findByIdAndRemove(req.params.id)
//         .then((product) => {
//             if (product) {
//                 return res
//                     .status(200)
//                     .json({
//                         success: true,
//                         message: 'the product is deleted!',
//                     });
//             } else {
//                 return res
//                     .status(404)
//                     .json({ success: false, message: 'product not found!' });
//             }
//         })
//         .catch((err) => {
//             return res.status(500).json({ success: false, error: err });
//         });
// });

// router.get(`/get/count`, async (req, res) => {
//     const productCount = await Product.countDocuments((count) => count);

//     if (!productCount) {
//         res.status(500).json({ success: false });
//     }
//     res.send({
//         productCount: productCount,
//     });
// });

// router.get(`/get/featured/:count`, async (req, res) => {
//     const count = req.params.count ? req.params.count : 0;
//     const products = await Product.find({ isFeatured: true }).limit(+count);

//     if (!products) {
//         res.status(500).json({ success: false });
//     }
//     res.send(products);
// });

// router.put(
//     '/gallery-images/:id',
//     uploadOptions.array('images', 10),
//     async (req, res) => {
//         if (!mongoose.isValidObjectId(req.params.id)) {
//             return res.status(400).send('Invalid Product Id');
//         }
//         const files = req.files;
//         let imagesPaths = [];
//         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

//         if (files) {
//             files.map((file) => {
//                 imagesPaths.push(`${basePath}${file.filename}`);
//             });
//         }

//         const product = await Product.findByIdAndUpdate(
//             req.params.id,
//             {
//                 images: imagesPaths,
//             },
//             { new: true }
//         );

//         if (!product)
//             return res.status(500).send('the gallery cannot be updated!');

//         res.send(product);
//     }
// );

// module.exports = router;


const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

// File type map for image uploads
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        if (!isValid) {
            return cb(new Error('Invalid image type'), false);
        }
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(/\s+/g, '-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const uploadOptions = multer({ storage: storage });

// Utility function to handle errors
const handleError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ success: false, message: error.message || 'Server error' });
};

// Get all products with optional category filter
router.get('/', async (req, res) => {
    try {
        const filter = req.query.categories ? { category: req.query.categories.split(',') } : {};
        const productList = await Product.find(filter).populate('category');
        res.status(200).json(productList);
    } catch (error) {
        handleError(res, error);
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        handleError(res, error);
    }
});

// Create a new product
router.post('/', uploadOptions.single('image'), async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send('Invalid Category');

        if (!req.file) return res.status(400).send('No image in the request');

        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        const product = new Product({
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
            isFeatured: req.body.isFeatured,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        handleError(res, error);
    }
});

// Update a product by ID
router.put('/:id', uploadOptions.single('image'), async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id');
        }

        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send('Invalid Category');

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');

        const file = req.file;
        const imagepath = file
            ? `${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`
            : product.image;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: imagepath,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
            },
            { new: true }
        );

        if (!updatedProduct) return res.status(500).send('Product cannot be updated');

        res.status(200).json(updatedProduct);
    } catch (error) {
        handleError(res, error);
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
});

// Get product count
router.get('/get/count', async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.status(200).json({ productCount });
    } catch (error) {
        handleError(res, error);
    }
});

// Get featured products
router.get('/get/featured/:count', async (req, res) => {
    try {
        const count = parseInt(req.params.count, 10) || 0;
        const products = await Product.find({ isFeatured: true }).limit(count);
        res.status(200).json(products);
    } catch (error) {
        handleError(res, error);
    }
});

// Update product gallery images
router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id');
        }

        const files = req.files;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        const imagesPaths = files.map(file => `${basePath}${file.filename}`);

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { images: imagesPaths },
            { new: true }
        );

        if (!updatedProduct) return res.status(500).send('Gallery images cannot be updated');

        res.status(200).json(updatedProduct);
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
