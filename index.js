const express = require("express");
const path = require("path"); // hàm này cs sẵn
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const moment = require("moment");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();

const app = express();
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io; //# cái _io là tên biến - đặt là gì cx đc, cái global là để ấy biến toàn cục dùng ở đâu cx đc


//Flash
app.use(cookieParser("DLKFKLGDFKLGD")); // key này mình điền bừa để khỏi bị lộ thôi, thích điền gì cx được
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End flash

// TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// End TinyMCE

//Ap local variables
app.locals.preFixAdmin = systemConfig.preFixAdmin;
app.locals.moment = moment;

app.use(express.static(`${__dirname}/public`));

//routes
routeAdmin(app);
route(app);
app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
        pageTitle: "404 Not Found",
    });
});
//@ dấu * ở đó nghĩa là tất cả các trường hợp còn lại

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
