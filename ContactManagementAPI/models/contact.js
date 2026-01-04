import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true
    },

    phone: {
      type: String,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
},
    {
    timestamps: true
  }
)

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;