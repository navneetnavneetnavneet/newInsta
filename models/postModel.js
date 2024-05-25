const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        picture: {
            type: String,
            required: [true, "Picture is required !"],
        },
        caption: {
            type: String,
            required: [true, "Caption is required !"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment",
            }
        ],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("post", postSchema);