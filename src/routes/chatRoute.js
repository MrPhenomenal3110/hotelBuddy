import express from 'express';
import cors from 'cors';
import openaiChatController from '../controllers/openaiChatController.js';
import handleThreadController from '../controllers/handleThreadsController.js';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.post("/chat", openaiChatController);
app.get("/thread", handleThreadController);

app.listen(8000, () => {
    console.log(`Listening at port : ${PORT}`);
});