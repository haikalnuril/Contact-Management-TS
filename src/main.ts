import { logger } from "./application/logging";
import { app } from "./application/server";

app.listen(3000, ()=> {
    logger.info('Listening on port 3000')
})