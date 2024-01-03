const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const {Admin} = require("../db");
const {JWT_SECRET} = require("../config");
const {Course} = require("../db");

// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const { username ,password } = req.body;

    // store in db
    await Admin.create({
        username,
        password
    })
    
    res.status(200).json({
        message:"Admin created successfully",
    });

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const { username ,password } = req.body;

    Admin.findOne({username, password})
    .then((data)=>{
        if(data){
            const payload = {
                username,
                password
            }
            const token = jwt.sign(payload,JWT_SECRET);
            res.status(200).json({
                token
            });
        }else{
            res.status(404).json({
                err:"Invalid Credentials"
            });
        }
    }).catch((err)=>{
        res.status(404).json({
            err:"Invalid Credentials"
        });
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price ,imageLink } = req.body;

    await Course.create({
        title,
        description,
        price,
        imageLink
    }).then((result)=>{
        res.status(200).json({
            message:"Course created successfully",
            courseId: result._id
        })    
    }).catch((err)=>{
        res.status(404).json({
            err: "Cannot create Course"
        });
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find({});
    res.json({courses});
});

module.exports = router;