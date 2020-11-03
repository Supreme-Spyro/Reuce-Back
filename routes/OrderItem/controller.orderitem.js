const OrderItem = require('../../models/OrderItem');

module.exports = {
  getAllOrderItem: (req, res) => {
    OrderItem.find()
    // .populate({
    //   path:'product_id',
    //   populate:[{
    //     path:'category',
    //     model:'category'          
    //   },{
    //     path:'platform',
    //     model:'platform'
    //   },{
    //     path:'comment_id',
    //     model:'comment',
    //     populate:{
    //       path:'user_id',
    //       model:'user'
    //     }
    //   },{
    //     path:'review_id',
    //     model:'review',
    //     populate:{
    //       path:'user_id',
    //       model:'user'
    //     }
    //   }]
    // })
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
    const OrderItems = await OrderItem.findById(req.params.id);
  
    try {
      res.json({
        message: "success get OrderItem with id",
        OrderItems
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  postOrderItem: async (req, res) => {
    
    const OrderItems = await OrderItem.create(req.body);
    
    try {
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
  }
}