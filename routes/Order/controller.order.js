const Order = require('../../models/Order');

module.exports = {
  getAllOrder: (req, res) => {
    Order.find()
    // .populate({
    //   path:'user_id',
    //   populate:{
    //     path:'product_id',
    //     model:'product',
    //     populate:[{
    //       path:'category',
    //       model:'category'          
    //     },{
    //       path:'platform',
    //       model:'platform'
    //     },{
    //       path:'comment_id',
    //       model:'comment'
    //     },{
    //       path:'review_id',
    //       model:'review'
    //     }]
    //   }
    // })
    // .populate({
    //   path:'order_item_id',
    //   populate:{
    //     path:'product_id',
    //     model:'product',
    //     populate:[{
    //       path:'category',
    //       model:'category'          
    //     },{
    //       path:'platform',
    //       model:'platform'
    //     },{
    //       path:'comment_id',
    //       model:'comment'
    //     },{
    //       path:'review_id',
    //       model:'review'
    //     }]
    //   }    
    // })
    .then(result => {
      res.status(200).json({
        message: "success get data Order",
        result
      })
    })
    .catch(err => {
      res.status(404).json("cannot get data Order")
    })
  },

  getOrderById: async (req, res) => {
    const Orders = await Order.findById(req.params.id);
  
    try {
      res.json({
        message: "success get Order with id",
        Orders
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  postOrder: async (req, res) => {
    
    const Orders = await Order.create(req.body);
    
    try {
      res.json({
        message: "success add data Order",
        Orders
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateOrder: (req, res) =>{
    Order.findByIdAndUpdate(req.params.id, req.body)
    .then(result =>{
        result.save();
        res.status(200).send("update Order success")
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  },
  deleteOrder: (req, res) =>{
    Order.findByIdAndDelete(req.params.id)
    .then(result =>{
        if(result){
            res.status(200).send(`Order id: ${req.params.id} has been deleted`)
        } else{
            res.send('delete Order failed')
        }
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  }
}