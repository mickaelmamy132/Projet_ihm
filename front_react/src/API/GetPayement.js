import axios from 'axios';

const GetPayement = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/Table_payement');
      return response.data.payement;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des payement :', error);
      return [];
    }
  };

export default GetPayement
