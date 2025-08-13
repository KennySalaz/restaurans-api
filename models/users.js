import UsersModel from "../schemas/users.js";

class UserModel {
  async createUser(data) {
    const user = await UsersModel.create(data);
    return user;
  }
  async getUserByEmail(email) {
    const user = await UsersModel.findOne({ email });
    return user;
  }
  async getProfileById(id) {
    const user = await UsersModel.findById(id);
    return user;
  }
  async updateUser(id, data) {
    const user = await UsersModel.findByIdAndUpdate(id, data, { new: true });
    return user;
  }
  async deleteUser(id) {
    const result = await UsersModel.findByIdAndDelete(id);
    return result;
  }
}

export default new UserModel();
