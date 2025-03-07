import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, "Email is required"]
    },
    fullname: {
        type: String,
        trim: true,
        required: [true, " fullname is required"],
        index: true
    },
    avatar: {
        type: String, //cloudanary
        required: true,
    },
    coverImage: {
        type: String, // cloudanary 
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

// hooks middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})
// custom methods 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);