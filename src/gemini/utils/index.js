import { genAI } from "../config/apiConfig.js";
import { tools, functions } from "../functionCallingDeclarations.js";

export function createModel() {
    const systemPrompt = `
    Booking a Hotel Room:
    When a user expresses interest in booking a hotel room, I should trigger a function call to access the hotel reservation system. This function would require the following information from the user's request:
    Check-in Date: Desired date for the hotel stay.
    Check-out Date: Desired departure date for the hotel stay.
    Number of Guests: Number of people staying in the room.
    (Optional) Room Preferences: Any specific preferences like bed type, view, etc. (This could be passed as an additional parameter to the function call).
    The function should then:
    Search for available rooms based on the user's criteria using the function for getting the details of all rooms.
    Return a list of available room options with details like price, type, description, etc.
    Confirming a Booking:
    When a user selects a room and confirms the booking, I should trigger a function call to the hotel reservation system API to process the booking. This function would require:
    User Information: Name, email, phone number (if needed for booking).
    Selected Room Information: Room ID or identifier from the previously retrieved list of available rooms.
    Payment Information: (Optional, depending on the booking system) Credit card details or payment method.
    The function should then:
    Process the booking in the reservation system.
    Return a confirmation message with details like booking ID, stay dates, and any additional information.
    Managing Existing Bookings:
    When a user inquires about an existing booking (e.g., "Can I see my reservation details?"), I should trigger a function call to the hotel reservation system API to retrieve booking information. This function would require:
    User Information (Optional): User ID or email associated with the booking (if applicable).
    Booking ID (Optional): If the user has the booking ID readily available.
    The function should then:
    Search for the booking based on the provided information.
    Return details about the existing booking, including dates, room type, guest names, etc.
    Cancelling a Booking:
    When a user requests to cancel a booking, I should trigger a function call to the hotel reservation system API to initiate cancellation. This function would require:
    Booking ID: The unique identifier for the booking the user wants to cancel.
    The function should then:
    Cancel the booking in the reservation system based on the provided ID.
    Return a confirmation message indicating successful cancellation or any error messages.
    Additionally:

    I can utilize function calls for other hotel-related tasks as needed, based on your specific requirements. These functions can be further defined and integrated into my capabilities.
    You can provide me with additional context or keywords to identify when a function call is appropriate.
    `;

    const model = genAI.getGenerativeModel(
        {
            model: "gemini-1.5-pro",
            tools: tools,
            systemInstruction: systemPrompt 
        },
    );
    return model;
}

let history = [];
export function createChatSession(model, history) {
    const chatSession = model.startChat({
        generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 1000,
            responseMimeType: "text/plain",
        },
        history: history,
    });

    return chatSession;
}

export async function sendMessageAndHandleFunctionCalls(model, message) {

    
    const chat = createChatSession(model, history);
    const prompt = message;

    const result = await chat.sendMessage(prompt);

    response = await result.response;

    console.log(`response : ${response}`);

    console.dir(response, { depth: null });
    console.log(`functionCalls : ${response.functionCalls()}`);

    history.push(
        {
            role: "user",
            parts: [{ text: prompt }],
        },
        {
            role: "model",
            parts: [{ text: response.text() }],
        }
    );

    if (response.candidates.length === 0) {
        throw new Error("No candidates");
    }

    const content = response.candidates[0].content;

    if (!content || !Array.isArray(content.parts) || content.parts.length === 0) {
        throw new Error("No parts");
    }

    const fc = content.parts[0].functionCall;
    if (fc) {
        const { name, args } = fc;
        const fn = functions[name];
        if (!fn) {
            throw new Error(`Unknown function "${name}"`);
        }
        const fr = [
            {
                functionResponse: {
                    name,
                    response: JSON.parse(await functions[name](args)),
                },
            },
        ];

        console.dir(fr, { depth: null });
        const request2 = JSON.stringify(fr);
        let response2;
        try {
            response2 = await chat.sendMessage(request2);
        } catch (error) {
            console.error('Error sending second message:', error);
            throw error;
        }

        history.push(
            {
                role: "model",
                parts: [{ text: response2.response.text() }],
            }
        );
        const result2 = response2.response;
        return result2;
    } else {
        return result;
    }
}
