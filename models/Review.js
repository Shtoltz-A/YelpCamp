import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const Sch = mongoose.Schema;

const reviewSchema = new Sch({
    body: {
        type: String
    },
    rating: {
        type: Number
    }
});

reviewSchema.plugin(mongooseLeanVirtuals);

export default mongoose.model("Review", reviewSchema);