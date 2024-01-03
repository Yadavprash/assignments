const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db/index");
const {Course} = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const { username, password}  = req.body;
    User.create({
        username,
        password
    }).then((result)=>{
        if(result){
            res.status(200).json("User created succesfully");
        }
    }).catch((err)=>{
        if(err){
            res.send(404).json({error: "User creation failed."})
        }
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
        .then((response)=>{
            if(response){
                res.status(200).json({
                    courses : response
                })
            }else{
                res.status(302).json("No courses Found!")
            }
        })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    },{
        "$push":{
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({username});
    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id:{
            "$in" : user.purchasedCourses
        }
    })
    res.json({
        courses
    })
});

module.exports = router