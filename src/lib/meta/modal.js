import Swal from "sweetalert2";

export function showModal(options) {
    return Swal.fire({
        allowEscapeKey: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        ...options,
        stopKeydownPropagation: false,
        heightAuto: false,
    });
}

export function hideModal(m) {
    return m.close();
}
