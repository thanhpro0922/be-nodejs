const Chat = require("../../model/chat.model");
const User = require("../../model/user.model");

const chatSocket = require("../../sockets/client/chat.socket");

const uploadToCloudinary = require("../../helpers/uploadToCloudinary");

//@ [GET] /chat/
module.exports.index = async (req, res) => {
    //@ SocketIO
    chatSocket(res);
    //@ End SocketIO

    //@ Lấy ra data
    const chats = await Chat.find({
        deleted: false,
    });

    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id,
        }).select("fullName");

        chat.infoUser = infoUser;
    }

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats,
    });
};
