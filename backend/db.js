import mongoose from "mongoose";
import { string } from "zod";

mongoose.connect(`mongodb+srv://gcbibek3353:152207mongodb365@clusterforlearning.cpxztqv.mongodb.net/payTm`);

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        require : true,
        trim : true,
        maxLength : 30,
    },
    lastName : {
        type : String,
        required : false,
        trim : true,
        maxLength : 30,
    },
    userName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 30,
        minLength : 3,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
        maxLength : 30,
    }
})

const AccountsSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    balance : {
        type : Number,
        required : true,
    }
})

export const User = mongoose.model('user',userSchema);
export const Account = mongoose.model('account',AccountsSchema);