import Dicio from "../Models/dicio";

export default {
  async get(word: string) {
    const result = await Dicio.find({
      word: new RegExp(`.*${word}*.`),
    }).catch((err: any) => {
      console.log(err);
    });

    return result;
  },
};
