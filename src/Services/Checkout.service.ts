import axios from "axios";

const baseURl = `${import.meta.env.VITE_BACKEND_URL}/checkouts`;

const createCheckout = async (payload) => {
  try {
    const response = await axios.post(baseURl, payload);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
const getAllCheckouts = async () => {
  try {
    const response = await axios.get(baseURl);
    return response.data;
  } catch (error) {
    console.log("Can not get the Members");
    throw error;
  }
};

export { createCheckout, getAllCheckouts };
