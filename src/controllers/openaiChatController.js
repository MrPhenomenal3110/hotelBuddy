import { openai } from '../openai/config/apiConfig.js';
import {getRoomDetails, bookRoom, getBookingDetails, createBooking, cancelBooking} from '../openai/helperFunctions/functions.js';
import { createAssistant, createRunObject, handleCreateMessage, handleCreateThread, handleRun } from '../openai/utils/utilFunctions.js';
import express from 'express';

const app = express();

app.use(express.json());

const assistant = await createAssistant(openai);

const thread = await handleCreateThread(openai);

const chatController = async (req, res) => {

  const message = req.body.message;
  const thread = req.body.threadId;
  
  const functions = {
    getRoomDetails : async () => {
      return await getRoomDetails()
    },
    bookRoom: async ({roomId, fullName, email, nights}) => {
      return await bookRoom(roomId, fullName, email, nights);
    },
    getBookingDetails: async ({bookingId}) => {
      return await getBookingDetails(bookingId);
    },
    cancelBooking: async ({bookingId}) => {
      return await cancelBooking(bookingId);
    }
  };
  
  await handleCreateMessage(openai, thread, message);

  const run = await createRunObject(openai, thread, assistant);

  await handleRun(res, openai, run, thread, functions);    
}

export default chatController;