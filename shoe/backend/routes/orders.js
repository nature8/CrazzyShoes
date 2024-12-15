// const {Order} = require('../models/order');
// const express = require('express');
// const { OrderItem } = require('../models/order-item');
// const router = express.Router();

// router.get(`/`, async (req, res) =>{
//     const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

//     if(!orderList) {
//         res.status(500).json({success: false})
//     } 
//     res.send(orderList);
// })

// router.get(`/:id`, async (req, res) =>{
//     const order = await Order.findById(req.params.id)
//     .populate('user', 'name')
//     .populate({ 
//         path: 'orderItems', populate: {
//             path : 'product', populate: 'category'} 
//         });

//     if(!order) {
//         res.status(500).json({success: false})
//     } 
//     res.send(order);
// })

// router.post('/', async (req,res)=>{
//     const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
//         let newOrderItem = new OrderItem({
//             quantity: orderItem.quantity,
//             product: orderItem.product
//         })

//         newOrderItem = await newOrderItem.save();

//         return newOrderItem._id;
//     }))
//     const orderItemsIdsResolved =  await orderItemsIds;

//     const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
//         const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
//         const totalPrice = orderItem.product.price * orderItem.quantity;
//         return totalPrice
//     }))

//     const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

//     let order = new Order({
//         orderItems: orderItemsIdsResolved,
//         shippingAddress1: req.body.shippingAddress1,
//         shippingAddress2: req.body.shippingAddress2,
//         city: req.body.city,
//         zip: req.body.zip,
//         country: req.body.country,
//         phone: req.body.phone,
//         status: req.body.status,
//         totalPrice: totalPrice,
//         user: req.body.user,
//     })
//     order = await order.save();

//     if(!order)
//     return res.status(400).send('the order cannot be created!')

//     res.send(order);
// })


// router.put('/:id',async (req, res)=> {
//     const order = await Order.findByIdAndUpdate(
//         req.params.id,
//         {
//             status: req.body.status
//         },
//         { new: true}
//     )

//     if(!order)
//     return res.status(400).send('the order cannot be update!')

//     res.send(order);
// })


// router.delete('/:id', (req, res)=>{
//     Order.findByIdAndRemove(req.params.id).then(async order =>{
//         if(order) {
//             await order.orderItems.map(async orderItem => {
//                 await OrderItem.findByIdAndRemove(orderItem)
//             })
//             return res.status(200).json({success: true, message: 'the order is deleted!'})
//         } else {
//             return res.status(404).json({success: false , message: "order not found!"})
//         }
//     }).catch(err=>{
//        return res.status(500).json({success: false, error: err}) 
//     })
// })

// router.get('/get/totalsales', async (req, res)=> {
//     const totalSales= await Order.aggregate([
//         { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
//     ])

//     if(!totalSales) {
//         return res.status(400).send('The order sales cannot be generated')
//     }

//     res.send({totalsales: totalSales.pop().totalsales})
// })

// router.get(`/get/count`, async (req, res) =>{
//     const orderCount = await Order.countDocuments((count) => count)

//     if(!orderCount) {
//         res.status(500).json({success: false})
//     } 
//     res.send({
//         orderCount: orderCount
//     });
// })

// router.get(`/get/userorders/:userid`, async (req, res) =>{
//     const userOrderList = await Order.find({user: req.params.userid}).populate({ 
//         path: 'orderItems', populate: {
//             path : 'product', populate: 'category'} 
//         }).sort({'dateOrdered': -1});

//     if(!userOrderList) {
//         res.status(500).json({success: false})
//     } 
//     res.send(userOrderList);
// })



// module.exports =router;


const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const express = require('express');
const router = express.Router();

// Utility function to handle errors
const handleError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ success: false, message: error.message || 'Server error' });
};

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orderList = await Order.find()
            .populate('user', 'name')
            .sort({ 'dateOrdered': -1 });

        if (!orderList) {
            return res.status(404).json({ success: false, message: 'No orders found' });
        }
        res.status(200).json(orderList);
    } catch (error) {
        handleError(res, error);
    }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name')
            .populate({
                path: 'orderItems',
                populate: { path: 'product', populate: 'category' }
            });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        handleError(res, error);
    }
});

// Create a new order
router.post('/', async (req, res) => {
    try {
        const orderItemsIds = await Promise.all(
            req.body.orderItems.map(async (orderItem) => {
                let newOrderItem = new OrderItem({
                    quantity: orderItem.quantity,
                    product: orderItem.product
                });
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id;
            })
        );

        const totalPrices = await Promise.all(
            orderItemsIds.map(async (orderItemId) => {
                const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
                return orderItem.product.price * orderItem.quantity;
            })
        );

        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

        const order = new Order({
            orderItems: orderItemsIds,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user,
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        handleError(res, error);
    }
});

// Update an order by ID
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        handleError(res, error);
    }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        await Promise.all(
            order.orderItems.map(async (orderItemId) => {
                await OrderItem.findByIdAndRemove(orderItemId);
            })
        );

        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
});

// Get total sales
router.get('/get/totalsales', async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
        ]);

        if (!totalSales.length) {
            return res.status(404).json({ success: false, message: 'No sales data found' });
        }

        res.status(200).json({ totalsales: totalSales[0].totalsales });
    } catch (error) {
        handleError(res, error);
    }
});

// Get order count
router.get('/get/count', async (req, res) => {
    try {
        const orderCount = await Order.countDocuments();
        res.status(200).json({ orderCount });
    } catch (error) {
        handleError(res, error);
    }
});

// Get orders by user ID
router.get('/get/userorders/:userid', async (req, res) => {
    try {
        const userOrderList = await Order.find({ user: req.params.userid })
            .populate({
                path: 'orderItems',
                populate: { path: 'product', populate: 'category' }
            })
            .sort({ 'dateOrdered': -1 });

        if (!userOrderList.length) {
            return res.status(404).json({ success: false, message: 'No orders found for this user' });
        }

        res.status(200).json(userOrderList);
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
