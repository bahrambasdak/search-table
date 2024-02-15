import axios from "axios";

const defaultUrl = 'https://jsonplaceholder.typicode.com/users/'

export const getUsers = async () => {
    const response = await axios.get(defaultUrl);
    return response.data;
  };

  export const createNewUser = async (data) => {
    const response = await axios.post(defaultUrl,data);
    return response.data;
  };

  export const editUser = async (data) => {
    const response = await axios.patch(defaultUrl+data.id,data);
    return response.data;
  };
  
  export const deleteUser = async (id) => {
    const response = await axios.delete(defaultUrl+id);
    return response.data;
  };