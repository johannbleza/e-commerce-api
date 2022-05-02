const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

// import routes module
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// mongodb connection & notification
mongoose.connect('mongodb+srv://admin:admin@batch139.axzmg.mongodb.net/ecommerce-api?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open',  () => console.log('Connected to Database'));


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))