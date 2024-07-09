import BookingRepository from "../../repositories/BookingRepository.js";
import BookingService from "../../services/BookingService.js";

const bookingService = new BookingService(new BookingRepository());

export const getRoomDetails = async () => {
    const url = "https://bot9assignement.deno.dev/rooms";
    const rooms = await fetch(url).then(
        (res) => {
            return res.json();
        }
    )
    return rooms;
}

export const bookRoom = async (roomId, fullName, email, nights) => {
    const url = "https://bot9assignement.deno.dev/book";
    try {
        console.log({roomId, fullName, email, nights});
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roomId: roomId,
                fullName: fullName,
                email: email,
                nights: nights,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error booking room: ${response.statusText}`);
        }
        const booking = await response.json();

        await createBooking(booking);

        return JSON.stringify(booking);
    } catch (error) {
        console.error(error);
        return JSON.stringify({ error: error.message });
    }
}

export const createBooking = async (bookingDetailsObject) => {
    try{
        console.dir(bookingDetailsObject, {depth: null});
        if(!bookingDetailsObject.message || bookingDetailsObject.message !== 'Booking successful') {
            return "Error in booking room.";
        }
        const bookingDetails = {
            ...bookingDetailsObject,
            bookingTimeStamp: new Date(),
        }
        const booking = await bookingService.addBooking(bookingDetails);
        console.dir(booking, {depth: null});

        return booking;

    } catch(err) {
        console.error("Error in creating booking: ",err);
    }
}

export const getBookingDetails = async (bookingId) => {
    try{
        const booking = await bookingService.getBookingById(bookingId);
        console.dir(booking, {depth: null});
        return booking;

    } catch(err) {
        console.error("Error getting booking details: ",err);
    }
}

export const cancelBooking = async (bookingId) => {
    try{
        bookingService.cancelBooking(bookingId);
    } catch(err) {
        console.error("Error in cancelling booking: ",err);
    }
}
