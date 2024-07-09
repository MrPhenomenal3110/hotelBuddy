import dotenv from 'dotenv';

dotenv.config({path: './.env'});

const getRoomDetails = async () => {
    const data = await fetch(process.env.HOTEL_URL).then(
        (res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    );
    return data;
}

export default getRoomDetails;