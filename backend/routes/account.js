import express from "express";
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";
import mongoose from "mongoose";

const router = express.Router();

// route for user to get his amount 
router.get('/balance', authMiddleware ,async (req,res)=>{
    const {userId} = req;
    const account = await Account.findOne({userId});
    res.status(200).json({
        balance : account.balance
    });
})

// route for user to transfer money to another account

// Bad Solution (Without using concept of transaction in Database)
// router.post('/transfer',authMiddleware,async (req,res)=>{
//     const {userId} = req;
//     const {to,amount} = req.body;

//     const {balance} = await Account.find({userId});

//     if(balance<amount){res.status(400).json({message: "Insufficient balance"})}
    
//     const toAccount = await Account.find({userId : to});
//     if(!toAccount){res.status(400).json({message: "Invalid account"})}

//     try {
//         await Account.findByIdAndUpdate({userId},{balance:balance-amount});

//         await Account.findByIdAndUpdate({to},{balance:toAccount.balance+amount});

//         res.status(200).json({
//             message: "Transfer successful"
//         })
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// })


// Actual solution using transaction
// const session = await mongoose.startSession();
// session.startTransaction();

// const userAccount = await Account.findOne({userId : req.userId}).session(session);
// const toAccount = await Account.findOne({userId : to}).session(session);
// await updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
// await updateOne({userId : to},{$inc:{balance : amount}}).session(session);

// session.abortTransaction() || session.commitTransaction()



router.post('/transfer',authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {to,amount} = req.body;
    const userAccount = await Account.findOne({userId : req.userId}).session(session);
    if(!userAccount || userAccount.balance<amount){
        session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId : to}).session(session);
    if(!toAccount){
        session.abortTransaction();
        res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId : to},{$inc:{balance : amount}}).session(session);

    session.commitTransaction();
    res.status(200).json({
        message : "Transaction completed Successfully"
    })
})

export default router;

