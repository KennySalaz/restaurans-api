import bcrypt from "bcrypt";
import userSchema from "../schemas/users.js";
import usersModel from "../models/users.js";
import { generateToken } from "../helpers/auth.js";

class UsersController {
  async register(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
          error:
            "All fields are required: firstName, lastName, email, password.",
        });
      }
      const userExist = await userSchema.findOne({ email });
      if (userExist) {
        return res.status(400).json({ error: "Email is already registered." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await usersModel.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        message: "User created successfully.",
        user,
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ error: "Email is already registered." });
      }
      if (error.errors) {
        const messages = Object.values(error.errors).map((e) => e.message);
        return res.status(400).json({ error: messages.join(" ") });
      }
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ error: "Internal server error while creating user." });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required." });
      }
      const user = await userSchema.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found with this email." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect password." });
      }

      const token = generateToken(user);

      res.status(200).json({
        message: "Login successful.",
        user: {
          id: user._id,
          email: user.email,
          accessToken: token,
        },
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res
        .status(500)
        .json({ error: "Internal server error while logging in." });
    }
  }
  async profile(req, res) {
    console.log("AQUIIIIIIIIIIIIIIIIII ==>", req.email);
    try {
      const user = await usersModel.getUserByEmail(req.email);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res
        .status(500)
        .json({ error: "Internal server error while fetching user." });
    }
  }
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, password } = req.body;
      if (!firstName && !lastName && !email && !password) {
        return res
          .status(400)
          .json({ error: "You must provide at least one field to update." });
      }
      const user = await usersModel.updateUser(id, {
        firstName,
        lastName,
        email,
        password,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found to update." });
      }
      res.status(200).json({
        message: "User updated successfully.",
        user,
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res
          .status(400)
          .json({ error: "Email is already registered by another user." });
      }
      if (error.errors) {
        const messages = Object.values(error.errors).map((e) => e.message);
        return res.status(400).json({ error: messages.join(" ") });
      }
      console.error("Error updating user:", error);
      res
        .status(500)
        .json({ error: "Internal server error while updating user." });
    }
  }
  async getProfileUser(req, res) {
    try {
      const { id } = req.params;
      console.log("AQUIII EL ID", id);
      const user = await usersModel.getProfileById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res
        .status(500)
        .json({ error: "Internal server error while fetching user." });
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await usersModel.deleteUser(id);
      if (!result) {
        return res.status(404).json({ error: "User not found to delete." });
      }
      res.status(200).json({
        message: "User deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res
        .status(500)
        .json({ error: "Internal server error while deleting user." });
    }
  }
}

export default new UsersController();
