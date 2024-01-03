const { Router, response} = require("express");
const adminMiddleware = require("../middleware/admin");
const {Course} = require("../db/index");
const {Admin} = require("../db/index");
const {User} = require("../db/index");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const { username , password } = req.body;
    if(!username || !password){
        res.status(302).json("Missing username or Password");
    }
    Admin.create({
        username : username,
        password : password
    })
        .then((response)=>{
            if(response){
                res.status(200).json("Admin created successfully");
            }
        })
        .catch((err)=>{
            res.status(404).json("Error");
        })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const { title, description , price ,imageLink } = req.body;

    Course.create({
        title,
        description,
        price,
        imageLink
    }).then((createResponse)=>{
        if(createResponse){
            res.status(200).json({
                message:"Course created successfully",
                courseId:createResponse._id
            })
        }
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    });
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
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

module.exports = router;