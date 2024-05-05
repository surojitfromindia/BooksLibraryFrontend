import axios from "axios";

const baseURl = `${import.meta.env.VITE_BACKEND_URL}/books`;
const createBooks = async (bookData) => {
  try {
    const payload = {
      title: bookData.title,
      isbn: bookData.isbn,
      edition: bookData.edition,
      author_ids: bookData.authorIds,
      keywords: bookData.keyWords,
    };
    const response = await axios.post(baseURl, payload);
    return response.data;
  } catch (error) {
    console.log("Can not Created", error);
    throw error;
  }
};
const getAllBooks = async () => {
  try {
    const response = await axios.get(baseURl);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
const deleteBook = async (delId: string) => {
  try {
    const response = await axios.delete(`${baseURl}/${delId}`);
    return response.data;
  } catch (error) {
    console.log("can not Delete", error);
    throw error;
  }
};

const getBookById = async (bookId: string) => {
  try {
    const response = await axios.get(`${baseURl}/${bookId}`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const updateBook = async (bookId, bookData) => {
  try {
    const payload = {
      title: bookData.title,
      isbn: bookData.isbn,
      edition: bookData.edition,
      author_ids: bookData.authorIds,
      keywords: bookData.keyWords,
    };
    const response = await axios.put(`${baseURl}/${bookId}`, payload);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const updateStock = async (bookId, newStock) => {
  try {
    const payload = {
      in_stock: newStock,
    };
    const response = await axios.put(`${baseURl}/${bookId}/stock`, payload);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export { createBooks, getAllBooks, deleteBook, getBookById, updateBook, updateStock };
