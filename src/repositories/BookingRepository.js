import IBookingRepository from './IBookingRepository.js';
import Booking from '../models/Booking.js';

class BookingRepository extends IBookingRepository {
    async addBooking(bookingDetails) {
        try {
            const booking = (await Booking.create(bookingDetails)).dataValues;
            return booking;
        } catch (error) {
            throw new Error(`Error adding booking: ${error.message}`);
        }
    }

    async getBookingById(bookingId) {
        try {
            console.log(bookingId);
            const booking = await Booking.findByPk(bookingId);
            return booking;
        } catch (error) {
            throw new Error(`Error retrieving booking: ${error.message}`);
        }
    }

    async cancelBooking(bookingId) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (booking) {
                await booking.destroy();
                return booking;
            } else {
                throw new Error(`Booking with ID ${bookingId} not found`);
            }
        } catch (error) {
            throw new Error(`Error canceling booking: ${error.message}`);
        }
    }
}

export default BookingRepository;
