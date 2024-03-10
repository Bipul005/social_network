const express = require("express")
const User= require("./models/User")
const app = express();

const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const PostRoutes = require("./routes/Post")
const FollowerRoutes = require("./routes/Follower")
const Social_FeedRoutes = require("./routes/Social_Feed")



const database = require("./config/database")
const cookieParser = require("cookie-parser")

const cors = require("cors")
const fileUpload = require("express-fileupload")
const { cloudnairyconnect } = require("./config/cloudinary")

const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 5000;
database.connect();

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: JSON.parse(process.env.CORS_ORIGIN),
    credentials: true,
    maxAge: 14400,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudnairyconnect();

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/Post", PostRoutes)
app.use("/api/v1/Follower", FollowerRoutes)
app.use("/api/v1/Social_Feed", Social_FeedRoutes)
app.use("/api/v1/profile", profileRoutes)


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
