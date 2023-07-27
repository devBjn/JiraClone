import Swal from "sweetalert2";

export default function AlertError(message) {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
}
