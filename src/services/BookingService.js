class BookingService {
    constructor(repository) {
        this.repository = repository;
    }

    async addBooking(bookingDetails) {
        return await this.repository.addBooking(bookingDetails);
    }

    async getBookingById(bookingId) {
        return await this.repository.getBookingById(bookingId);
    }

    async cancelBooking(bookingId) {
        return await this.repository.cancelBooking(bookingId);
    }
}

export default BookingService;
