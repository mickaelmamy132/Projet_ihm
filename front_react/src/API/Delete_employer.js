import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Delete_employer = async (ID_employer) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/supprimer_employers/${ID_employer}`);
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
        });
    } catch (error) {
        toast.error('suppression echouer!', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            
        });        
    }
};
export default Delete_employer