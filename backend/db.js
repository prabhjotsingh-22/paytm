const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: 2, 
        maxlength: 50 
    },
    lastName: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: 2, 
        maxlength: 50 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    Account
};
