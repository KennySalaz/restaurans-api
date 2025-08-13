import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Menu from "../schemas/menu.js";
import mongoose from "mongoose";

class menuModel  {
    async create (data) {
       return await Menu.create(data);
    }
    async getAll () {
        return await Menu.find({});
    }
    async getById (id) {
        return await Menu.findById(id);
    }
    async update (id, data) {
        return await Menu.findByIdAndUpdate({_id : id}, data, { new: true });
    }
    async delete (id) {
        return await Menu.findByIdAndDelete({_id : id});
    }

}


export default new menuModel();