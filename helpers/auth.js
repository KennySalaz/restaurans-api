import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";

function generateToken(user) {
  const token = jsonwebtoken.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.email = decoded?.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export { generateToken, verifyToken };
