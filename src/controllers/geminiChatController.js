import { createModel, sendMessageAndHandleFunctionCalls } from '../gemini/utils/index.js';

const geminiChatController = async (req, res) => {
    console.log('Incoming request headers:', req.headers);
    console.log('Incoming request body:', req.body);

    const model = createModel();
    const message = req.body.message;

    if (!message) {
        return res.status(400).send({ error: 'Message is required' });
    }

    try {
        const answer = await sendMessageAndHandleFunctionCalls(model, message);
        return res.status(200).send({ answer });
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};

export default geminiChatController;
