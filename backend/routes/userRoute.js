import { Router } from "express";
import { z } from "zod";
import { User,Account } from "../db.js";
import { authMiddleware } from "../middleware.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config.js'

const router = Router();

const userSchema = z.object({
    firstName: z.string().max(30),
    lastName: z.string().max(30),
    userName: z.string().email(),
    password: z.string().min(6),
})

const updateUserSchema = z.object({
    firstName: z.string().max(30).optional(),
    lastName: z.string().max(30).optional(),
    password: z.string().min(6).optional(),
})


// Route for user to sign Up / Register
router.post('/signUp', async (req, res) => {
    const { firstName, lastName, userName, password } = req.body;
    const response = userSchema.safeParse(req.body);
    console.log(response);
    
    if (!response.success) {
        return res.status(403).send("Invalid Input");
    }
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
        return res.status(411).send("User already exists with gien username");
    }

    const newUser = await User.create({ firstName, lastName, userName, password });
    const userId = newUser._id;

    // Giving random amount to new customer 
    await Account.create({
        userId,
        balance : Math.floor(Math.random()*10000) 
    })

    const token = jwt.sign({ userId }, JWT_SECRET);
    res.status(200).json({
        message: "User created successfully",
        token: token,
    })
})

// Route for user to Sign in / Login
router.post('/signin', async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName, password });
    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    console.log(user);
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({
        token: token
    })
})

// Route for user to Change details : Name,Password
router.put('/', authMiddleware, async (req, res) => {
    const { firstName, lastName, password } = req.body;
    const { userId } = req;
    // console.log(userId);

    const { success } = updateUserSchema.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    try {
        await User.findOneAndUpdate({_id : userId}, { firstName, lastName, password });
        res.status(200).json({
            message: "updated Successfully"
        });
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }

})

// Route for filtering user based on their Name
router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },
        {
            lastName: {
                "$regex": filter
            },
        }]
    })

    res.json({
        users 
    })
})

//Route to get a User given userId as query parameter
router.get('/user',async (req,res)=>{
    const userId = req.query.userId || "";
    try {
        const user = await User.findOne({_id : userId});
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

// Route to get user given authorization token
router.get('/me',authMiddleware,async (req,res)=>{
    const { userId } = req;
    try {
        const user = await User.findOne({_id : userId});
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})


export default router;