import axios from 'axios';

const Getdeduction = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/deduction');
    const { deduction, type } = response.data;
    return { deduction, type };
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des deduction :', error);
    return [];
  }
};


export default Getdeduction
 