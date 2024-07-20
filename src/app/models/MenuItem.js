const { Schema, models, model, default: mongoose } = require("mongoose");

const ExtraPriceSchema = new Schema ({
    name: { type: String, required: true },
    price: { type: Number, required: true },
})


const MenuItemSchema = new Schema({
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number },
    category: { type: mongoose.Types.ObjectId },
    image: { type: String },
    sizes: {type: [ExtraPriceSchema]},
    extraIngredientsPrices: {type: [ExtraPriceSchema]}

}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)