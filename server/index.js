// step 1: Importing express
const express = require("express");
const app = express();

// step7: import Main routes of project, taaki hum inn routes ko define aur use kar sake
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary"); 
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// step2: configure dotenv and PORT
dotenv.config();
const PORT = process.env.PORT || 4000;

// step 3: Connect to the database 
database.connect();


// step4: middlewares
app.use(express.json());
app.use(cookieParser());
app.use( 
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",   
	})
)

// step9: cloudinary connection
cloudinaryConnect();

// step8:  jo routes humne import kare they, unko use karne ke liye humne app.use() method ka use kiya
// jisse humne routes ko use kar liya
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// step5: default route, taaki pata chale ki server chalu hai
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

// step6: server listen on PORT 4000 or any other port defined in .env file
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`) 
})

