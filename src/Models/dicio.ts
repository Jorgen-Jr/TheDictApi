import mongoose from "./../config/database";

const DicioSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: [String],
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  example: {
    type: [String],
    required: false,
  },
  html: {
    type: {
      definition: {
        type: String,
        required: false,
      },
      example: {
        type: String,
        required: false,
      },
    },
    required: false,
  },
});

const Dicio = mongoose.model("dicio", DicioSchema);

export default Dicio;
