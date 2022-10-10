import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

interface propsNotificaion {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}

export default function Notificacao(props: propsNotificaion) {
    const theme = localStorage.getItem('theme');
    // use a random type of notification
    toast(props.message, { 
        type: props.type, 
        position: 'top-center', 
        theme: theme === 'dark' ? 'dark' : 'light',
        autoClose: 2000,
        bodyStyle: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#fff' : '#000',
        }
    });
};