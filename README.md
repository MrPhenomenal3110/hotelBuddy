# HotelBuddy
HotelBuddy is a chatbot designed to assist users with room booking. It provides features such as looking up available rooms, booking a room, fetching booking details via booking ID, and canceling a previous booking via booking ID.

## Table of Contents :
- [﻿Features](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#features) 
- [﻿Technologies Used](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#technologiesUsed) 
- [﻿Installation](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#installation) 
- [﻿Usage](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#usage) 
- [﻿API Endpoints](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#apiEndpoints) 
    - [﻿GET](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#get) 
    - [﻿POST](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#post) 
- [﻿Architecture](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#architecture) 
- [﻿Database](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#db) 
- [﻿OpenAI API](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#openaiapis) 
- [﻿Contributing](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#contributing) 
- [﻿License](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#license) 
- [﻿Client Repository](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#clientRepo) 
- [﻿Contact](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/README.md#contact) 
---

## Features
- Look up available rooms
- Book a room
- Fetch booking details via booking ID
- Cancel a booking via booking ID

## Technologies Used
- Node.js
- Express.js
- SQLite
- Sequelize
- OpenAI API

## Installation
- Clone the repository.
- Navigate to the project directory:
```
cd hotelBuddy
```
- Install dependencies:
```
npm install
```
- Setting up the database: There is no need to set up the database as such, because it uses an in-memory database.

## Usage
### Starting the Server
To start the server, run:

```
npm run test
```
>  **NOTE** : There is a folder named openai and a folder named gemini. Currently only openai is functional and gemini has not yet been implemented. 

### API Endpoints
#### GET `/thread` 
Provides the thread ID which is used to identify a unique conversation. For every session, the client will first have to make a GET request to the server once at the very beginning to get the thread ID. The client can then use this thread ID throughout the session to uniquely identify the conversation.

**Response:**

```json
{
  "threadId": "unique-thread-id"
}
```
#### POST `/chat` 
Takes in the user message and thread ID as request body and returns the chatbot's response.

**Request Body:**

```json
{
  "threadId": "unique-thread-id",
  "message": "user message"
}
```
**Response Payload:**

```json
{
  "response": "chatbot response"
}
```
## Architecture
HotelBuddy uses the repository pattern for database interactions and the controller-service pattern to organize the codebase.

### Repository Pattern
HotelBuddy uses a repository layer for database operations and all the functions for these database operations are defined in the respository.

### Controller Service Pattern
HotelBuddy uses the Controller-Service pattern to organize the codebase, such that all the services include files that are functions required for services like for example BookingServices handles the booking of rooms by doing the necessary database operations and carrying out other necessary operations maybe like calling another service, etc.

## Database
HotelBuddy uses SQLite as the database and Sequelize as the ORM.

### Database Setup
Since, HotelBuddy uses an in-memory database, there is no need to set-up the database separately.

**Database Schema**

The database is used for storing the booking details.

Here is the database schema link: [﻿drawsql.app/teams/backendprojectsst/diagrams/hotelbuddy](https://drawsql.app/teams/backendprojectsst/diagrams/hotelbuddy) 

## OpenAI API
HotelBuddy uses the OpenAI API for chatbot functionality, leveraging the function calling feature and assistants.

You can learn more and understand how assistants work and how function calling works in assistants here : [﻿platform.openai.com/docs/assistants/tools/function-calling/function-calling-beta](https://platform.openai.com/docs/assistants/tools/function-calling/function-calling-beta) 

- All the functions used for function calling are present in the file : `src/openai/helperFunctions/functions.js`  
- All the functions declarations are present in the file : `src/openai/utils/functionDeclarations.js`  
- The utility functions for creating assistants, run object, threads, etc. are present in the file : `src/openai/utils/utilFunctions.js` 
## Contributing
 [﻿github.com/MrPhenomenal3110/hotelBuddy/blob/main/CONTRIBUTING.md](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/CONTRIBUTING.md) 

## License
[﻿github.com/MrPhenomenal3110/hotelBuddy/blob/main/LICENSE](https://github.com/MrPhenomenal3110/hotelBuddy/blob/main/LICENSE) 

## Client Repository
[﻿HotelBuddy Client GitHub Repository](https://github.com/MrPhenomenal3110/hotelBuddyClient) 

## Contact
For any questions or inquiries, please contact **Prem Shah** at [﻿prem.nbshah@gmail.com](mailto:prem.nbshah@gmail.com).

