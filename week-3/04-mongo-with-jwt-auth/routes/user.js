const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require('../db');
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const { username , password } = req.body;
    User.create({
        username,
        password
    }).then((result)=>{
        if(result){
            res.status(200).json({
                message:"User created successfully"
            })
        }else{
            res.status(404).json({
                message:"Cannot create user!"
            })
        }
    }).catch((err)=>{
        res.status(404).json({
            message:"Cannot create user!"
        });
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username , password } = req.body;
    
    const user = User.find({username, password});
    if(user){
        const payload = {
            username,
            password
        };
        const token = jwt.sign(payload,JWT_SECRET);

        res.status(200).json({
            token
        })
    }else{
        res.status(404).json({
            message:"Invalid credentials!"
        });
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
   const courses = await Course.find({});

   if(courses){
     res.json({
        courses
     })
   }else{
    res.status(404).json({
        message:"Cannot get Courses!"
    });
   }

});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token,JWT_SECRET);
    console.log(payload);
    User.updateOne({
        username : payload.username
    },{
        "$push":{
            purchasedCourses: courseId
        }
    }).then((result)=>{
        // console.log(result);
        res.status(403).json({
            message:"Course purchased successfully"
        })
    }).catch((err)=>{
        res.status(404).json({
            message:"Purchased Failed"
        });
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    
    const user = await User.findOne({username});

    try{
        if(user){
            const purchased = await Course.find({
                    _id:{
                        "$in": user.purchasedCourses
                    }
                });
            if(purchased){
                res.status(200).json({
                    purchasedCourses:purchased
                })
            }
        }
    }catch(err){
        console.log(err);
        res.status(404).json({
            message:"No purchased Courses"
        });
    }
});

module.exports = router