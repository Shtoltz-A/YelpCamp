import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import passportLocalMongoose from "passport-local-mongoose";

const Sch = mongoose.Schema;

const UserSchema = new Sch({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.plugin(mongooseLeanVirtuals);
UserSchema.plugin(passportLocalMongoose.default);

export default mongoose.model("User", UserSchema);