import bodyParser from 'body-parser';
import express from 'express';

import eventRoutes from './routes/events.js';
import { connectToDatabase } from './data/database.js';

const app = express();

app.use(bodyParser.json());
app.use(eventRoutes);

async function startServer() {
    await connectToDatabase();

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server is running and listening on port ${port}`);
    });
}

startServer();