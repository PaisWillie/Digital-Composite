import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Show an error toast
export function showErrorToast(message: string) {
  toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#7A003C',
      color: '#FFFFFF'
    }
  })
}

// Show a success toast
export function showSuccessToast(message: string) {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#007A3C',
      color: '#FFFFFF'
    }
  })
}

// Show an info toast
export function showInfoToast(message: string) {
  toast.info(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#003C7A',
      color: '#FFFFFF'
    }
  })
}

// Show a loading toast
export function showLoadingToast(message: string) {
  return toast.loading(message, {
    position: 'top-center',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#7A003C',
      color: '#FFFFFF'
    }
  })
}

// Update an existing toast
export function updateToast(
  toastId: string | number,
  message: string,
  type: 'success' | 'error'
) {
  toast.update(toastId, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 5000,
    position: 'top-center',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: type === 'success' ? '#007A3C' : '#7A003C',
      color: '#FFFFFF'
    }
  })
}

// Component to render the ToastContainer globally
export function ToastWrapper() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default ToastWrapper
