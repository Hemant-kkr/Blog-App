import userModel from "../models/model.user.js";
import AppError from "../utils/appErrors.js";
import catchAsync from "../utils/catchAsync.js";
const getAlluser = catchAsync(async (req, res, next) => {
  const admin = req.admin;
  if (!admin || admin.role !== "admin") {
    throw new AppError("Admin not found", 400);
  }
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(40, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;
  const { q, role, sort } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (q) {
    filter.$or = [
      {
        username: { $regex: q, $options: "i" },
      },
      {
        email: { $regex: q, $options: "i" },
      },
    ];
  }
 const [total, users]= await Promise.all([
   userModel.countDocuments(filter),
   userModel.find(filter)
   .sort(sort)
   .skip(skip)
   .limit(limit)
   .select("username email  createdAt profile")
 ])

   const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    success: true,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    data: users,
  });
});

export default getAlluser;
