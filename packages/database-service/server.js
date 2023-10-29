const { json } = require("express");
const server = require("express")();

const port = 4040;
async function run() {
  server.use(json());
  const dbConnect = require("./util")("mongodb://localhost/microblog");

  dbConnect
    .then(() => {
      console.log("Database connected well!");
      server.listen(port, () =>
        console.log(`server started successfully on port ${port}`)
      );
    })
    .catch(() => process.exit(1));
}

run();
