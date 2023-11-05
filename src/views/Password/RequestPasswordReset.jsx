import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestPasswordResetAction } from "../../Redux/actions/";
import Swal from "sweetalert2";

const RequestPasswordReset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [sweet, setSweet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        navigate("/");
      } else setSweet(true);
    };
    fetchData();
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (sweet) {
      Swal.fire({
        title: "Escribe tu correo electrónico",
        input: "text",
        showDenyButton: true,
        confirmButtonText: "Enviar correo de recuperación",
        denyButtonText: "Cancelar",
        confirmButtonColor: "#394754",
        denyButtonColor: "#394754",
        background: "#3b3838",
        color: "#ffffff",
        preConfirm: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            Swal.showValidationMessage(
              '<i class="fa fa-info-circle"></i> Por favor ingresa un correo electrónico válido'
            );
          }
          if (!value) {
            Swal.showValidationMessage(
              '<i class="fa fa-info-circle"></i> Es necesario que ingreses tu correo'
            );
          }
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch(requestPasswordResetAction(result, navigate));
        } else {
          navigate("/form/login");
        }
      });
    }
  }, [dispatch, navigate, sweet]);

  return <></>;
};

export default RequestPasswordReset;
