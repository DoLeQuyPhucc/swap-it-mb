import axios from "axios"

export const fetchAllBooks = async () => {
  try {
    const response = await axios.get('https://66e1bb3ec831c8811b56281f.mockapi.io/books');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}