const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        slug: { type: String, slug: "title", unique: true }, // unique: true dùng để đảm bảo rằng không có 2 slug giống nhau
        deleted: {
            type: Boolean,
            default: false, // nếu ngta truyển vào thì theo họ truyền, còn ko thì giá trị mặc định là default
        },
        deletedAt: Date,
    },
    { timestamps: true }
);
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
