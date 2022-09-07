import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SalestalentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6) {
          throw new Error("Enter a strong password");
        }
      },
    },
    mobileNo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    whatsappNo: {
      type: String,
      trim: true,
    },
    allowedWhatsapp: {
      type: Boolean,
      default: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    verifiedNo: {
      type: Boolean,
      default: false,
    },
    adminVerified: {
      type: Boolean,
      default: false,
    },
    profileComplete: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Date,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    tokens: [
      {
        token: {
          required: true,
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

SalestalentSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "salestalentId",
});

SalestalentSchema.virtual("basics", {
  ref: "Basics",
  localField: "_id",
  foreignField: "salestalentId",
});

SalestalentSchema.virtual("works", {
  ref: "WorkExperience",
  localField: "_id",
  foreignField: "salestalentId",
});

SalestalentSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "salestalentId",
});

SalestalentSchema.virtual("certificates", {
  ref: "Certificate",
  localField: "_id",
  foreignField: "salestalentId",
});

SalestalentSchema.virtual("educations", {
  ref: "Education",
  localField: "_id",
  foreignField: "salestalentId",
});

SalestalentSchema.methods.toJSON = function () {
  const sales = this;
  const salesObject = sales.toObject();

  delete salesObject.password;
  delete salesObject.tokens;

  return salesObject;
};

SalestalentSchema.statics.findUsingCredentials = async (email, password) => {
  const lowercaseEmail = email.toLowerCase();
  const salestalent = await Salestalent.findOne({ email: lowercaseEmail });
  if (!salestalent) {
    throw new Error("salestalent not found");
  }

  const isFound = await bcrypt.compare(password, salestalent.password);
  if (!isFound) {
    throw new Error("You have entered wrong password");
  }

  return salestalent;
};

SalestalentSchema.methods.generateAuthToken = async function () {
  console.log('ENtry Pont')
    const salestalent = this; //user being generate

  const token = jwt.sign(
    { _id: salestalent._id.toString() },
    process.env.TOKEN_SECRET
  );
    console.log(token+ "This is Token ");
  salestalent.tokens = salestalent.tokens.concat({ token });
  await salestalent.save();

  return token;
};

SalestalentSchema.pre("save", async function (next) {
  const salestalent = this; //user which is being saved

  if (salestalent.isModified("password")) {
    salestalent.password = await bcrypt.hash(salestalent.password, 8);
  }

  next();
});


export const Salestalent = mongoose.model("Salestalent", SalestalentSchema);
