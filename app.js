const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() =>{
    console.log("Connected to DB");
  })
  .catch((err) =>{
    console.log("err");
  });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));

//creating a basic API
app.get("/", (req,res) =>{
    res.send("Hi, I am root");
});

//Index Route
app.get("/listings", async (req, res) => {
    try {
        // Fetch all listings from the database
        const allListings = await Listing.find({});

        // Render the listings in the EJS view
        res.render("listings/index", { allListings });
    } catch (err) {
        console.error("Error fetching listings:", err);
        res.status(500).send("Error fetching listings");
    }
});

//create New Listing Route
app.get("/listings/new" , (req,res) =>{
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id" , async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show" , { listing });
});

//Create Listing ADD Route POST
app.post("/listings" , async (req,res) => {
  //  let {title, description, image, price, country, location} = req.body;
 // let listing = req.body.listing;
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");

});

/*
app.get("/testListing", async (req, res) => {
    try {
        let sampleListing = new Listing({
            title: "My New Villa",
            description: "By the beach",
            price: 1200,
            location: "Teliarganj, Prayagraj",
            country: "India",
            image: {
                filename: 'listingimage',
                url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
            }
        });
        await sampleListing.save();
        console.log("Sample was saved");
        res.send("Successful testing");
    } catch (err) {
        console.error("Error saving listing:", err);
        res.status(500).send("Error saving the listing");
    }
});
*/
app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});