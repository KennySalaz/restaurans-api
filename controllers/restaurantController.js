import restaurantModel from "../models/restaurant.js";

class restaurantController {
  constructor() {}
  async create(req, res) {
    console.log("Creating new restaurant with data:", req.body);
    try {
      const data = await restaurantModel.create(req.body);
      console.log("Created restaurant:", data);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error creating restaurant:", error);
        return res.status(500).json({ message:  error.message });
    }
  }

  async getAll(req, res) {
    try {
      const data = await restaurantModel.getAll();
      return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message:  error.message });
    }
  }

  async update(req, res) {
    console.log("Updating restaurant details", req.params.id, req.body);
    try {
      const data = await restaurantModel.update(req.params.id, req.body);
      return res
        .status(200)
        .json({ message: "Restaurant updated successfully", data });
    } catch (error) {
      return res.status(500).json({ message:  error.message });
    }
  }

  async delete(req, res) {
    console.log("Deleting restaurant", req.params.id);
    try {
      const data = await restaurantModel.delete(req.params.id);
      return res
        .status(200)
        .json({ message: "Restaurant deleted successfully", data });
    } catch (error) {
        return res.status(500).json({ message:  error.message });
    }
  }

  async getById(req, res) {
    console.log("Fetching restaurant by ID", req.params.id);

    try {
      const data = await restaurantModel.getById(req.params.id);
      console.log("Fetched restaurant by ID:", data);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching restaurant by ID:", error);
      return res.status(500).json({ message:  error.message });
    }
  }
}

export default new restaurantController();
