import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import Review from "../models/Review.js";

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
    },
    reviews: [
        {
            type: Sch.Types.ObjectId,
            ref: "Review"
        }
    ]
});

campgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        });
    };
});

campgroundSchema.plugin(mongooseLeanVirtuals);

export default mongoose.model("Campground", campgroundSchema);