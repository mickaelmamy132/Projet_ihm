import axios from 'axios';

const getEmployer = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/');
    const { employers, departe, count_employers_Ressource, count_employers_finance, count_employers_marketing, count_employers_ventes } = response.data;
    return { employers, departe, count_employers_Ressource, count_employers_finance, count_employers_marketing, count_employers_ventes };
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des employés :', error);
    return [];
  }
};

export default getEmployer;
