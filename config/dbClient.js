import mongoose from "mongoose";
class dbCliente {
  constructor() {
    this.connectBd();
  }
  async connectBd() {
    const queryString = process.env.MONGODB_URI;
    await mongoose.connect(queryString);
  }
  async close() {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
    }
  }
}

export default new dbCliente();
