import axios from 'axios';

console.log('YO', process.env.NEXT_PUBLIC_BACK_URL);
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_URL, // Replace with your desired base URL
    timeout: 5000, // Set a timeout if needed
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need
    },
});

export default instance;