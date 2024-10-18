const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: {
            filename: { type: String, required: true },
            url: { type: String, required: true },
        },
        default: {
            filename: "defaultImage",
            url: "https://i0.wp.com/roadlesstravelled.me/wp-content/uploads/2015/09/nyc-cover.jpg?fit=1447%2C1000&ssl=1",
        },
        set: (v) => (v && typeof v === "object") ? v : JSON.parse(v),
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;