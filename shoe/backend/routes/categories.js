// const {Category} = require('../models/category');
// const express = require('express');
// const router = express.Router();

// router.get(`/`, async (req, res) =>{
//     const categoryList = await Category.find();

//     if(!categoryList) {
//         res.status(500).json({success: false})
//     } 
//     res.status(200).send(categoryList);
// })

// router.get('/:id', async(req,res)=>{
//     const category = await Category.findById(req.params.id);

//     if(!category) {
//         res.status(500).json({message: 'The category with the given ID was not found.'})
//     } 
//     res.status(200).send(category);
// })



// router.post('/', async (req,res)=>{
//     let category = new Category({
//         name: req.body.name,
//         icon: req.body.icon,
//         color: req.body.color
//     })
//     category = await category.save();

//     if(!category)
//     return res.status(400).send('the category cannot be created!')

//     res.send(category);
// })


// router.put('/:id',async (req, res)=> {
//     const category = await Category.findByIdAndUpdate(
//         req.params.id,
//         {
//             name: req.body.name,
//             icon: req.body.icon || category.icon,
//             color: req.body.color,
//         },
//         { new: true}
//     )

//     if(!category)
//     return res.status(400).send('the category cannot be created!')

//     res.send(category);
// })

// router.delete('/:id', (req, res)=>{
//     Category.findByIdAndRemove(req.params.id).then(category =>{
//         if(category) {
//             return res.status(200).json({success: true, message: 'the category is deleted!'})
//         } else {
//             return res.status(404).json({success: false , message: "category not found!"})
//         }
//     }).catch(err=>{
//        return res.status(500).json({success: false, error: err}) 
//     })
// })

// module.exports =router;

const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

// Utility function to handle errors
const handleError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ success: false, message: error.message || 'Server error' });
};

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();
        if (!categoryList.length) {
            return res.status(404).json({ success: false, message: 'No categories found' });
        }
        res.status(200).json(categoryList);
    } catch (error) {
        handleError(res, error);
    }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        handleError(res, error);
    }
});

// Create a new category
router.post('/', async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        });

        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        handleError(res, error, 400);
    }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color,
            },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        handleError(res, error, 400);
    }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
