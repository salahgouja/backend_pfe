require("colors");
const express = require("express");
const app = express();
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(errorHandler);
const connectDB = require("./config/db");
const port = process.env.PORT || 5002; //or 5002

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", require("./routes/productsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.listen(port, () => console.log(`server en marche on ${port}`));
