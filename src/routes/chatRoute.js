import express from 'express';
import cors from 'cors';
import openaiChatController from '../controllers/openaiChatController.js';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.post("/chat", openaiChatController);

app.listen(PORT, () => {
    console.log(`Listening at port : ${PORT}`);
});