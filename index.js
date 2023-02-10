const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const walkSync = require("walk-sync");

const paths = walkSync("./swaggers", { directories: false });

const swaggers = [];

for (let i = 0; i < paths.length; i++) {
    const swaggerDocument = require(`./swaggers/${paths[i]}`);
    swaggers.push(swaggerDocument);
    app.use(`/${paths[i].split('/')[0]}`, swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup(swaggers[i]));
    console.log(`/${paths[i].split('/')[0]}`);
}

app.listen(3000, () => {
    console.log("We're up!");
});
