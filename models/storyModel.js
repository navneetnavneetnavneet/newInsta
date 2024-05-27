const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
  {
    picture: {
      type: String,
      required: [true, "Picture is required !"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("story", storySchema);
