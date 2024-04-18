import axios from "axios";

const baseURl = "http://localhost:7000/authors";
const createAuthors= async(
    firstName: string,
  lastName: string,
  email: string,
)=> {
    try{
        const payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,         
          };
          const response= await axios.post(baseURl,payload);
          return response.data;
    }
    catch(error){
        console.log("Error", error);
        throw error;
    }
};
const getallAuthors= async()=>{
    try {
        const response = await axios.get(baseURl);
        return response.data;
      } catch (error) {
        console.log("Can not get the Members");
        throw error;
      }
};

export {createAuthors, getallAuthors}
