import Restaurant from "../schemas/restaurant.js";

class restaurantModel  {
    async create (data) {
       return await Restaurant.create(data);
    }
    async getAll () {
        return await Restaurant.find({});
    }
    async getById (id) {
        return await Restaurant.findById(id);
    }
    async update (id, data) {
        return await Restaurant.findByIdAndUpdate({_id : id}, data, { new: true });
    }
    async delete (id) {
        return await Restaurant.findByIdAndDelete({_id : id});
    }
}

export default new restaurantModel();
