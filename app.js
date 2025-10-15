import express from "express";
const app = express();

//importing inbuilt moodules
import dotenv from "dotenv";

//importing Local Modules
import errorHandler from "./src/middlewares/ErrorHandler.js";
import AppError from "./src/utils/appErrors.js";

//import Routes Modules
import authRoutes from "./src/routes/routes.auth.js";
import usersProfileRoutes from "./src/routes/routes.userProfile.js";
import postsRoutes from "./src/routes/routes.posts.js";
import commentsRoutes from "./src/routes/routes.comments.js";
// import categoriesRoutes from "./src/routes";
import analyticsRoutes from "./src/routes/routes.analytics.js";


//configure dotenv
dotenv.config();

//using inbuilt middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Authentication / User Management
app.use("/api/auth", authRoutes);

// RoutesUser Profile / Management
app.use("/api/user", usersProfileRoutes);

// Routes Posts / Blogs
app.use("/api/posts", postsRoutes);

// Routes Comments
app.use("/api/comments", commentsRoutes);

// Routes Tags / Categories (Optional) 
// app.use("/api/auth", categoriesRoutes);

// Routes Analytics / Stats (Optional / Admin)
app.use("/api/analytics", analyticsRoutes);


//Unknown routes (404)
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global error handler (must be last)
app.use(errorHandler);

export default app;
