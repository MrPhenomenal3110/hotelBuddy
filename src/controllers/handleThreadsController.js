import { openai } from "../openai/config/apiConfig.js"
import { handleCreateThread } from "../openai/utils/utilFunctions.js"

const handleThreadController = async(req, res) => {
    const thread = await handleCreateThread(openai);
    return res.send({threadId: thread.id});
}

export default handleThreadController;