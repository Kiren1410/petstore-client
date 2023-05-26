import axios from "axios";

export const getOrders = async () => {
    try{
        const res = await axios.get("http://localhost:1234/orders", {
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        });
        return res.data;
    } catch (error) {
        throw new Error('Error retrieving orders');
    }
  };

  export const getOrdersById = async (id) => {
    try{
        const res = await axios.get(`http://localhost:1234/orders/${id}`);
        return res.data;
    } catch (error) {
        throw new Error('Error retrieving orders');
    }
  };