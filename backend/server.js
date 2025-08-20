const express = require ("express");
const app = express();
const dotenv = require ("dotenv");
dotenv.config();
const cookieParser = require ("cookie-parser");
const cors = require ("cors");
const path = require ("path");
const connectDB = require ("./config/db.js");
const userRouter = require ("./routes/user.route.js");
const wallRoute = require ("./routes/wallList.route.js");
const reviewRoute = require ("./routes/review.route.js");

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use("/api/v1/user", userRouter);
app.use("/api/v1/elixir", wallRoute);
app.use("/api/v1/elixir", reviewRoute);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/.*/", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDB();
});
