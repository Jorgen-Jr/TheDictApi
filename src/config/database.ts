import mongoose from "mongoose";

mongoose.connect(process.env.DB_URI || "localhost", {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  dbName: process.env.DB_DATABASE,
});

// mongoose.set("debug", function (coll, method, query, doc, options) {
//   let set = {
//     coll: coll,
//     method: method,
//     query: query,
//     doc: doc,
//     options: options,
//   };

//   console.info({
//     dbQuery: set,
//   });
// });

mongoose.pluralize(null);

export default mongoose;
