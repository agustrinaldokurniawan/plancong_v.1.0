var mongoose = require("mongoose");
var Hotel = require("./models/hotelDB");
var Comment = require("./models/comment");

// var data = [
//     {
//         name: "Name 1",
//         image: "https://s-ec.bstatic.com/images/hotel/max1024x768/147/147997361.jpg",
//         description: "this is description 1"
//     },
//     {
//         name: "Name 2",
//         image: "https://s-ec.bstatic.com/images/hotel/max1024x768/147/147997361.jpg",
//         description: "this is description 2"
//     },
//     {
//         name: "Name 3",
//         image: "https://s-ec.bstatic.com/images/hotel/max1024x768/147/147997361.jpg",
//         description: "this is description 3"
//     }
// ]

function seedDB() {
    Hotel.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed Hotels!");
            data.forEach(function (seed) {
                Hotel.create(seed, function (err, hotel) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added");
                        Comment.create(
                            {
                                text: "This is Comment",
                                author: "Me"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    hotel.comments.push(comment);
                                    hotel.save();
                                    console.log("Comment Created");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;