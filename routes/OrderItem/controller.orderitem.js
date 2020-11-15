const mongoose = require('mongoose')
const OrderItem = require('../../models/OrderItem');
const Product = require('../../models/Product')

module.exports = {
  getAllOrderItem: (req, res) => {
    OrderItem.find()
    .populate({
      path:'product',
      model:'Product'
    })
    .populate({
      path:'user',
      model:'User'
    })
    .then(result => {
      res.status(200).json({
        message: "success get data OrderItem",
        result
      })
    })
    .catch(err => {
      res.status(404).json("cannot get data OrderItem")
    })
  },

  getOrderItemById: async (req, res) => {
    const OrderItems = await OrderItem.findById(req.params.id)
    .populate({
      path:'product',
      model:'Product'
    })
    .populate({
      path:'user',
      model:'User'
    });
  
    try {
      console.log("data amount by id: ",OrderItems.amount)
      res.json({
        message: "success get OrderItem with id",
        OrderItems
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getOrderItemByUser: async (req, res) =>{
    const OrderItemsUser = await OrderItem.find({user: req.params.id})
    .sort({name:1})
    .populate('user')
    .populate('product')

    try {
      res.json({
        message: `success get product with user id ${req.params.id}`,
        OrderItemsUser,
      });
    } catch (error) {
      console.log(error)
    }
  },

  postOrderItem: async (req, res) => {

    // const orderItem = createOrderItem(req);

    // try {
    //   orderItem.save();
    //   res.json({
    //     message: 'create order item success',
    //     product:{
    //       _id: product.id,
    //       product: orderItem.product.populate('product'),
    //       quantity: orderItem.quantity,
    //       user: orderItem.user,
    //       amount: orderItem.amount
    //     }
    //   })
    // } catch (error) {
    //   res.send(error)
    // }


    const OrderItems = await OrderItem.create(req.body);
    
    try {
      console.log("data amount",OrderItems.amount)
      res.json({
        message: "success add data OrderItem",
        OrderItems
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateOrderItem: (req, res) =>{
    OrderItem.findByIdAndUpdate(req.params.id, req.body)
    .then(result =>{
        result.save();
        res.status(200).send("update OrderItem success")
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  },
  deleteOrderItem: (req, res) =>{
    OrderItem.findByIdAndDelete(req.params.id)
    .then(result =>{
        if(result){
            res.status(200).send(`OrderItem id: ${req.params.id} has been deleted`)
        } else{
            res.send('delete OrderItem failed')
        }
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  },
  deleteAllOrderItemByUser: (req, res) =>{
    OrderItem.remove({user: req.params.id})
    
    .then(result =>{
        if(result){
            res.status(200).send(`OrderItem id: ${req.params.id} has been deleted`)
        } else{
            res.send('delete OrderItem failed')
        }
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  }
}

// const createOrderItem = (req) => {
//   return new OrderItem({
//       _id: new mongoose.Types.ObjectId(),
//       product: req.body.product,
//       quantity: req.body.quantity,
//       user: req.body.user,
//       amount: req.body.product.price * req.body.quantity ,
//   });
// }