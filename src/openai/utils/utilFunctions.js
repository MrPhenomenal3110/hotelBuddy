import { bookRoomDeclaration, getRoomDetailsDeclaration} from './functionDeclarations.js';

export const createAssistant = async (openai) => {

    const assistant = await openai.beta.assistants.create({
        instructions: `
        1. You are a very cool hotel assistant, named Hotel Buddy that helps users to book their rooms. You have to greet users everytime they start a chat. 
        2. You are also well-versed in English and Hinglish. When someone talks in hinglish, you answer in Hinglish. You help people with hotel room bookings and cancellations. Do not book if user has not provided the required details (name, email and room and stay related requirements). Ask user for details everytime.
        3. Use the provided functions to answer questions. For booking you have to take all the required details the name, email and ask for either of the two :
            a. check in date along with number of nights to stay. (both are required)
            b. check in date with check out date. (both are rquired)
        You have to calculate number of nights if check in date and check out date both are provided. Also use room type to extract room id.
        4. The number of nights can not be zero. If it is zero, then ask the user for valid dates. Do not proceed without these detaails. 
        5. IMPORTANT : You have to ask all these required data from the user and avoid filling them by assumption (i.e. Fill in the details only if user has provided it in the conversation. Do not fill in random data by yourself.).
        6. Also, a user can get their booking details by their booking id, which calls a function getBookingDetails and also users can cancel bookings using booking id. There is a function for this too. 
        `,
        model: "gpt-3.5-turbo",
        tools: [
            {
                type: "function",
                function: {
                    ...getRoomDetailsDeclaration,
                },
            },
            {
                type: "function",
                function: {
                    ...bookRoomDeclaration,
                },
            },
        ],
    });

    console.log("Assistant id is : " + assistant.id);

    return assistant;
}

export const createRunObject = async (openai, thread, assistant) => {
    const runObject = await openai.beta.threads.runs.createAndPoll(
        thread,
        {
            assistant_id: assistant.id,
        },
    )
    return runObject;
}

export const handleCreateMessage = async (openai, thread, content) => {
    await openai.beta.threads.messages.create(
        thread,
        {
            role: "user",
            content: content,
        }
    );
    console.log(content)
}

export const handleCreateThread = async (openai) => {
    const thread = await openai.beta.threads.create();
    return thread;
}

export const handleRun = async (res, openai, run, thread, functions) => {
    console.log(run.status);

    if (run.status === "completed") {
        let messages = await openai.beta.threads.messages.list(thread);
        console.log(messages.data[0].content);
        return res.send(messages.data);
      } else if (run.status === "requires_action") {
        console.log(run.status);
        return await handleRequiresAction(res, openai, run, thread, functions);
      } else {
        console.dir(run, {depth: null});
        console.error("Run did not complete:", run);
      }
}

const handleRequiresAction = async (res, openai, run, thread, functions) => {
    console.log(run);
    if( run &&
        run.required_action.submit_tool_outputs &&
        run.required_action.submit_tool_outputs.tool_calls) 
    {

        const toolOutputs = [];

        const toolCalls = run.required_action.submit_tool_outputs.tool_calls;

        console.log("toolCalls : ")

        console.dir(toolCalls, {depth: null})

        console.dir(functions, {depth: null})

        for(const tool of toolCalls){
            console.log(tool.function.name);
            if(functions.hasOwnProperty(tool.function.name)){
                let output = {};
                if(tool.function.name !== "getRoomDetails") {
                    const parsedArguments = JSON.parse(tool.function.arguments)
                    output = await functions[tool.function.name](parsedArguments);
                }
                else {
                    output = await functions[tool.function.name]();
                }
                toolOutputs.push({
                    "tool_call_id": tool.id,
                    "output": JSON.stringify([output]),
                })
            }
        }
        if (toolOutputs.length > 0) {
            run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
                thread,
                run.id,
                {
                    tool_outputs: toolOutputs
                },
            );
            console.log("Tool outputs submitted successfully.");
        } else {
        console.log("No tool outputs to submit.");
        }
        return handleRun(res, openai, run, thread, functions);
    }
}

