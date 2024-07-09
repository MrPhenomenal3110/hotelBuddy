import { FunctionDeclarationSchemaType } from "@google/generative-ai";
import getRoomDetails from "./getRoomDetails/getRoomDetails.js";

export const tools = [
    {
        functionDeclarations: [
            {
                name: "getRoomDetails",
                description: "Get the details of all the available rooms",
                parameters: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {},
                },
            },
        ],
    },
];

export const functions = {
    getRoomDetails: ({ value }) => {
        return getRoomDetails();
    },
};