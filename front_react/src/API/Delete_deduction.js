import axios from 'axios';

const Delete_deduction = async (deduction_id) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/supprimer_deduction/${deduction_id}`);
        toast.success('suppression réussi!', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { backgroundColor: 'green', color: 'white' },
            bodyStyle: { fontSize: '16px' },
            progressStyle: { backgroundColor: 'white' },
            onClose: () => navigate('/table_deduction'),
          });
          setTimeout(() => {
            window.location.reload();
        }, 1900); 
        console.log('deduction supprimé avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression du deduction :', error);
    }
};

export default Delete_deduction
 