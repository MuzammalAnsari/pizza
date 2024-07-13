const { Schema, models, model } = require("mongoose");

const MenuItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    image: { type: String },

}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)