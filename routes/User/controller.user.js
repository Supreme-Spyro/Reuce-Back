require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User  = require('../../models/User');

module.exports = {
    getAllUser: (req, res) => {
        User.find().sort({role:1, fullname:1})
            .populate({
                path:'review',
                populate:{
                    path:'commenter',
                    model:'User'
                }
            })
            .then((result) => {
                // let mySort = {role:1}
                // let data = result.sort(mySort)
                res.status(200).json({
                    message: 'success get data User',
                    result,
                });
            })
            .catch((err) => {
                res.status(404).json('cannot get data User');
            });
    },

    getUserById: async (req, res) => {
        const Users = await User.findById(req.params.id).sort({role:1})
        .populate({
            path:'review',
            populate:{
                path:'commenter',
                model:'User'
            }
        })
        

        try {
            res.json({
                message: 'success get user with id',
                Users,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },

    registerUser: async (req, res) => {
        // console.log("User", User
        
        
        // check have same email or not
        UserCheckEmail = await User.findOne({ email: req.body.email });
        try {
          if (UserCheckEmail) {
            return res.status(400).json({ email: "email has been registered" });
          } else {

            // check have same username or not
            UserCheckName = await User.findOne({ username: req.body.username });
            try {
              if (UserCheckName) {
                return res
                  .status(400)
                  .json({ username: "username has been registered" });
              } else {

                // creating new user if not have same email and username with other user
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);

                let Users = {
                  ...req.body,
                  password: hash,
                };
                // console.log(User);

                // console.log("Users", Users);
                Users = await User.create(Users);
                try {
                  if (Users) {
                  }
                  res.json({
                    message: `success register User: ${req.body.username}`,
                    Users,
                  });
                } catch (err) {
                  console.log("ini error", err);
                  // res.send(err);
                  res.status(500).send(err);
                }
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }

        
    },
    updateUser: async (req, res) =>{

        const salt =  await bcrypt.genSalt(10);
        console.log("data body: ", req.body)
        const hash =  await bcrypt.hash(req.body.password, salt);

                let Users = {
                  ...req.body,
                  password: hash,
                };

        const dataUsers =  await User.findByIdAndUpdate(req.params.id, Users)
        
        // .then((result)=>{
        //     res.json({
        //         message:'update success'
        //     })
        // })
        // .catch((error) =>{
        //     res.json({
        //         message:'update failed',
        //         error
        //     })
        // })

        try {
            if(dataUsers){
                res.json({
                    message:'success update data user'
                    // dataUsers
                })
            }
        } catch (error) {
           res.status(404).json({
               message:'update failed',
               error
           }) 
        }
    },
    // updateDataUser: (req, ) =>{

    // },
    deleteUser: (req, res) =>{
        User.findByIdAndDelete(req.params.id)
        .then(result =>{
            if(result){
                res.status(200).send(`User id: ${req.params.id} has been deleted`)
            } else{
                res.send('delete User failed')
            }
        })
        .catch(error =>{
            res.status(404).send(error)
        })
    },

    loginUser: async (req, res) => {
        try {
            const Users = await User.findOne({ email: req.body.email });
            if (Users) {
                const pass = bcrypt.compareSync(
                    req.body.password,
                    Users.password
                );
                if (pass) {
                    const token = jwt.sign(
                        Users.toObject(),
                        process.env.SECRET_KEY
                    );
                    res.json({
                        message: 'login success',
                        token,
                    });
                } else {
                    res.status(400).json('wrong password');
                }
            } else {
                res.json('user not found');
            }
        } catch (err) {
            console.log(err);
        }
    },
    myProfile: (req, res) => {
        res.json({
            message: `hello user: ${req.body.username}`,
            user: req.body,
            
        });
    }
};