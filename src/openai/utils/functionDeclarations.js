export const getRoomDetailsDeclaration = {
    name: "getRoomDetails",
    description: "Get information about the different types of available rooms for booking, their price, and their descriptions",
    parameters: {
        type: "object",
        properties: {
            roomId: {
                type: "string",
                description: "The information about room id required while booking",
            },
            roomType: {
                type: "string",
                description: "There are 4 types of rooms Deluxe, Suite, Executive and Family.",
            },
            price: {
                type: "number",
                description: "The price depends on the type of room",
            }
        },
        required: [],
    },
};

export const bookRoomDeclaration = {
    name: "bookRoom",
    description: 'Book the requested room for the user after getting all the required details from the user and then provide them with their booking details. Do not assume details like name, email, nights, room type. Ask them if they are not given by the user in the entire conversation.',
    parameters: {
      type: "object",
      properties: {
        roomId: {
          type: "number",
          description: 'The id of the room which is to be booked. eg, 1,2,5. The room type can be inferred from the chat with user and room id can then be found using room type.',
        },
        fullName: {
          type: "string",
          description: 'The name of the person who is booking the room. The user provides this argument. Do not assume any name without the user providing it.'
        },
        email: {
          type: "string",
          description: 'The email of the person who is booking the room. The user provides this argument.',
        },
        nights: {
          type: "number",
          description: 'The number of nights the room is to be booked. eg., 1,2,3. Always a positive integer. The user provides this argument.',
        }
      },
      required: ["fullName", "email", "nights"],
    },
};

export const getBookingDetailsDeclaration = {
  name: "getBookingDetails",
  description: 'Get the rquested booking details using the booking id provided.',
  parameters: {
    type: "object",
    properties: {
      bookingId: {
        type: "number",
        description: 'The id of booking details.',
      },
    },
    required: ["bookingId"],
  },
};

export const cancelBookingDeclaration = {
  name: "cancelBooking",
  description: 'Cancel the rquested booking using the booking id provided.',
  parameters: {
    type: "object",
    properties: {
      bookingId: {
        type: "number",
        description: 'The id of booking.',
      },
    },
    required: ["bookingId"],
  },
};
