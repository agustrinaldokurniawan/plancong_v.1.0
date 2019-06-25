var mongoose = require("mongoose");

var hotelSchema = new mongoose.Schema({
    name: String,
    image: String,
    country: String,
    city: String,
    minPrice: String,
    maxPrice: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Hotel", hotelSchema);
