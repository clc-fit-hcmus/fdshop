const FD = require("../../models/fds");

const query = (filter = {}) => FD.find(filter);

const save = async (req) => {
    const {name} = req.body;
    const {release_date} = req.body;
    const {is_best} = req.body;
    const {is_drink} = req.body;
    const {price} = req.body;
    const {discount} = req.body;
    const {description} = req.body;
    const {avatar} = req.body;
    const {cloudinary_id} = req.body;

    const newFD = new FD({
        name: name,
        release_date: release_date,
        is_best: is_best,
        is_drink: is_drink,
        price: price,
        discount: discount,
        description: description,
        avatar: avatar,
        cloudinary_id: cloudinary_id
    });

    return await newFD.save();
};

module.exports = {
    query,
    save
}