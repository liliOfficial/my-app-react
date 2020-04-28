import { toast } from 'react-toastify';
const errorHandler = (e) => {
    const error = e.response;
    if (error && error.status === 401) return window.location.href = "http://localhost:8888";
    if (error && error.status >= 400 && error.status < 500) return toast.error("An unexpected error occurrred.");
    throw e;
}

export default errorHandler

