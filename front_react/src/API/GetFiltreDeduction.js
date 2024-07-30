import axios from 'axios';

const GetFiltreDeduction = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/Filtre_deduction');
      const response2 = await axios.get('http://127.0.0.1:8000/api/type_deduction');
      return {
        liste_employer_indeduction: response.data.Liste_employer_indeduction,
        type: response2.data.type
      };
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des payement :', error);
      return [];
    }
  }; 

export default GetFiltreDeduction
