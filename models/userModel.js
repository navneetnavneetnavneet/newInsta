const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required !"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: [true, "Name is required !"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required !"],
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        email: {
            type: String,
            required: [true, "Password is required !"],
            trim: true,
            // minLength: [6, "Password must have atleast 6 characters"],
            // maxLength: [15, "Password should not more than 15 characters"],
        },
        bio: {
            type: String,
        },
        profileImage: {
            type: String,
            default: "dimage.jpg"
        },
        followers: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "user" 
            }
        ],
        followings: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "user" 
            }
        ],
        posts: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "post" 
            }
        ],
        stories: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "story" 
            }
        ],
        savePosts: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "post" 
            }
        ],
    }, 
    {
        timestamps: true
    }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);