var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Hotel = require("./models/hotelDB"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

var commentRoutes = require("./routes/comments"),
    hotelRoutes = require("./routes/hotels"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/plancong_v_1_0_0", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// seedDB();

app.use(require("express-session")({
    secret: "Who are you ?",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(hotelRoutes);
app.use(commentRoutes);

var port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));