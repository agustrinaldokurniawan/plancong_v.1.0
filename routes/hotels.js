var express = require("express");
var router = express.Router();
var Hotel = require("../models/hotelDB");

router.get("/hotel", function (req, res) {
    console.log(req.user);
    Hotel.find({}, function (err, allHotels) {
        if (err) {
            console.log(err);
        } else {
            res.render("hotel", { hotelCollection: allHotels });
        }
    });
});
router.post("/newHotel", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var country = req.body.country;
    var city = req.body.city;
    var minPrice = req.body.minPrice;
    var maxPrice = req.body.maxPrice;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newHotel = {
        name: name,
        image: image,
        description: description,
        country: country,
        city: city,
        minPrice: minPrice,
        maxPrice: maxPrice,
        author: author
    }
    Hotel.create(newHotel, function (err, newCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newCreated);
            res.redirect("/hotel");
        }
    });
});
router.get("/admin", function (req, res) {
    res.render("admin");
});
router.get("/hotel/:id", function (req, res) {
    Hotel.findById(req.params.id).populate("comments").exec(function (err, foundHotel) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundHotel);
            res.render("detail", {
                hotel: foundHotel
            });
        }
    })
});

module.exports = router;
