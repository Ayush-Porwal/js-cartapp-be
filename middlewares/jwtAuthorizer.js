import jwt from "jsonwebtoken";

const jwtAuthorizer = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  next();
};

export default jwtAuthorizer;
