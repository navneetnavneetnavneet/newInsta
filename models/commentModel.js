const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model("comment", commentSchema);