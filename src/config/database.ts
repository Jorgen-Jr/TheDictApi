import mongoose from "mongoose";

mongoose.connect(process.env.DB_URI || "localhost", {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  dbName: process.env.DB_DATABASE,
});

mongoose.pluralize(null);

export default mongoose;
