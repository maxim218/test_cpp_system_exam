"use strict";

import runServer from "./runServer";
import routeQueries from "./routeQueries";

function start() {
    const app = runServer();
    routeQueries(app);
}

start();
