import axios from 'axios';

const GetDash = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/dashboard');
    const { counts, countsEmployer, deductions, count_employers_Ressource, count_employers_finance, count_employers_marketing, count_employers_ventes } = response.data;
    return { counts, countsEmployer, deductions, count_employers_Ressource, count_employers_finance, count_employers_marketing, count_employers_ventes };
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des employés :', error);
    return [];
  }
};

export default GetDash
