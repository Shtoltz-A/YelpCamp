import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const Sch = mongoose.Schema;

const campgroundSchema = new Sch({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    image: {
        type: String
    }
});


campgroundSchema.plugin(mongooseLeanVirtuals);

export default mongoose.model("Campground", campgroundSchema);