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
        //(v && typeof v === "object") ? v : JSON.parse(v),
        set: (v) => {
            // If value is an object, return it directly
            if (v && typeof v === "object") {
                return v;
            }

            // Try parsing if it's a string and not empty
            if (typeof v === "string" && v.trim() !== "") {
                try {
                    return JSON.parse(v);
                } catch (error) {
                    // If parsing fails, return the default value
                    console.error("Failed to parse image value:", error);
                    return {
                        filename: "defaultImage",
                        url: "https://i0.wp.com/roadlesstravelled.me/wp-content/uploads/2015/09/nyc-cover.jpg?fit=1447%2C1000&ssl=1",
                    };
                }
            }

            // Return default value if image is not provided or parsing fails
            return {
                filename: "defaultImage",
                url: "https://i0.wp.com/roadlesstravelled.me/wp-content/uploads/2015/09/nyc-cover.jpg?fit=1447%2C1000&ssl=1",
            };
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;