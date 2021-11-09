import cors from "cors";
import express, { Request, Response } from "express";
import DicioController from "./controllers/DicioController";

const router = express.Router();

//Import all the controller
const ThesaurusScrapper = require("./controllers/ThesaurusScrapper");
const UrbanDictionaryScrapper = require("./controllers/UrbanDictionaryScrapper");
const PriberamScrapper = require("./controllers/PriberamScrapper");

const app = express();

//Allow cors access
app.use(cors());

//Allow json requests.
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

//Carregar as variáveis de enviromnent.
if (process.env.NODE_ENV !== "production") {
  if (process.env.NODE_ENV === "test") {
    require("dotenv").config({
      path: ".env.test",
    });
  } else {
    require("dotenv").config({
      path: ".env",
    });
  }
}

router.get("/", (_: Request, res: Response) => {
  res.json({ message: "I'm working hooman!" });
});

//Use thesaurus
router.get("/thesaurus/:word", async (req: Request, res: Response) => {
  const { word } = req.params;
  console.log("Getting a thesaurus definition: " + word);

  const response = await ThesaurusScrapper.getWordDefinition(word);

  return res.send(response);
});

//Use Urban Dictionary
router.get("/urbandictionary/:word", async (req: Request, res: Response) => {
  const { word } = req.params;
  console.log("Getting a Urban Dictionary definition: " + word);

  const response = await UrbanDictionaryScrapper.getWordDefinition(word);

  return res.send(response);
});

//Use Priberam
router.get("/priberam/:word", async (req: Request, res: Response) => {
  const { word } = req.params;
  console.log("Getting a Priberam definition: " + word);

  const response = await PriberamScrapper.getWordDefinition(word);

  return res.send(response);
});

//Use dicio.com.br
router.get("/dicio/:word", async (req: Request, res: Response) => {
  const { word } = req.params;

  console.log("Getting a Dicio.com definition: " + word);

  const response = await DicioController.get(word);

  return res.send(response);
});

app.use("", router);

export default app;
