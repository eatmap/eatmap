import { toast } from 'react-toastify';

const TOAST_OPTIONS = {
  position: 'bottom-left',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export function showErrorMessage(message) {
  toast.error(message, TOAST_OPTIONS);
}

export function showSuccessMessage(message) {
  toast.success(message, TOAST_OPTIONS);
}
