import axios from "axios";

const baseURl = `${import.meta.env.VITE_BACKEND_URL}/books`;
const createBooks = async (
  title: string,
  isbn: number,
  edition: string,
  authorIds: string,
  keyWords: string
) => {
  try {
    const payload = {
      title: title,
      isbn: isbn,
      edition: edition,
      author_ids: authorIds,
      keywords: keyWords,
    };
    const response = await axios.post(baseURl, payload);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
const getallBooks = async () => {
  try {
    const response = await axios.get(baseURl);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
const deleteBook= async(delId: string)=> {
    try{
        const response= await axios.delete(`${baseURl}/${delId}`);
        return response.data;
    }
    catch(error){
        console.log("can not Delete",error);
        throw error;
    }
};

export {createBooks, getallBooks, deleteBook};