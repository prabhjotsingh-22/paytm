const express = require('express');
const {z} = require('zod');
const { User } = require('../db');
const { authMiddleware } = require('../middleware');
const JWT_SECRET = require('../config');
const jwt = require("jsonwebtoken");

const router = express.Router();

const signupSchema = z.object({
    firstName: z.string()
        .trim()
        .min(2, "First name must be at least 2 characters long")
        .max(50, "First name must not exceed 50 characters"),
    lastName: z.string()
        .trim()
        .min(2, "Last name must be at least 2 characters long")
        .max(50, "Last name must not exceed 50 characters"),
    username: z.string()
        .trim()
        .min(3, "Username must be at least 3 characters long"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
});


router.post('/signup', async (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = User.findOne({
        username: body.username
    })
    
    if (user._id) {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);
    const token = JWT_SECRET.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    res.json({
        message: "User Created Successfully",
        token: token
    })
});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = z.object({
    password: z.string.optional,
    firstName: z.string.optional(),
    lastName: z.string.optional()
})

router.put("/", authMiddleware, async(req,res)=>{
    const {success}  = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updation"
        })

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated Sucessfully"
    })
    }
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;