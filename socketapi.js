const userModel = require("./models/userModel");
const messageModel = require("./models/messageModel");

const io = require("socket.io")();
const socketapi = {
  io: io,
};

// Add your socket.io logic here!
io.on("connection", function (socket) {
  socket.on("join-server", async (details) => {
    const currentUser = await userModel.findOne({
      username: details.sender,
    });
    currentUser.socketId = socket.id;
    await currentUser.save();
    // console.log(currentUser);

    const onlineUsers = await userModel.find({
      socketId: { $nin: [""] },
      username: { $nin: [currentUser.username] },
    });

    // console.log(onlineUsers);
  });

  socket.on("disconnect", async () => {
    await userModel.findOneAndUpdate(
      { socketId: socket.id },
      { socketId: "" },
      { new: true }
    );
  });

  socket.on("privateMessage", async (msg) => {
    // console.log(msg);
    try {
      await messageModel.create({
        message: msg.message,
        toUser: msg.reciver,
        fromUser: msg.sender,
      });

      const reciver = await userModel.findOne({
        username: msg.reciver,
      });

      if (reciver) {
        io.to(reciver.socketId).emit("recivePrivateMessage", msg);
      }

      //   console.log(reciver);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("getMessage", async (msg) => {
    // console.log(msg);
    try {
      const allMessages = await messageModel.find({
        $or: [
          { fromUser: msg.sender, toUser: msg.reciver },
          { fromUser: msg.reciver, toUser: msg.sender },
        ],
      });

      //   console.log(allMessages);

      socket.emit("getAllMessage", allMessages);
    } catch (error) {
      console.log(error);
    }
  });

  console.log("A user connected");
});
// end of socket.io logic

module.exports = socketapi;
