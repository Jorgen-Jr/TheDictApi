import app from "./app";

//Porta que será usada pela API.
app.listen(process.env.PORT);

console.info("\x1b[36m%s\x1b[4m", "--- App was sucessfully instantiated --");

console.info(
  "\x1b[34m%s\x1b[0m",
  "--- Application running at port",
  process.env.PORT || 3001,
  " ready for requests---"
);
