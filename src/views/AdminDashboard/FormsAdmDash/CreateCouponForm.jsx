import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCoupon, clearErrors } from "../../../Redux/actions.js";
import Swal from "sweetalert2";
import Styles from "../FormsAdmDash/cuponForm.module.css";

const CreateCouponForm = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [couponNew, setCouponNew] = useState({
    status: "",
    expiration: "",
    discount: "",
    usagesAvailable: "",
    code: "",
  });

  const isFormValid = () => {
    return (
      couponNew.status &&
      couponNew.expiration &&
      couponNew.discount &&
      couponNew.usagesAvailable &&
      couponNew.code
    );
  };

  const handleCreateCoupon = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      console.error("Completa todos los campos antes de enviar el formulario");
      return;
    }

    try {
      const response = await dispatch(createCoupon(couponNew));

      if (response && response.error) {
        dispatch(
          setErrors({
            type: "CREATE_COUPON",
            error: response.error.response.data,
          })
        );
      } else {
        dispatch(clearErrors());
        Swal.fire("Listo", "Has creado un nuevo cupón", "success");
        setCouponNew({
          status: "",
          expiration: "",
          discount: "",
          usagesAvailable: "",
          code: "",
        });
      }
    } catch (error) {
      console.error("Error al crear el cupón:", error);
    }
  };

  return (
    <div className={Styles.containerPadre}>
      <div className={Styles.containerPadrastro}>
        <div className={Styles.containerAlinea}>
          <h6>Crear un cupón descuento</h6>
          <div className={Styles.containerHijo}>
            <form className={Styles.formu} onSubmit={handleCreateCoupon}>
              <div className={Styles.LadoA}>
                <div className={Styles.inputsBox}>
                  <label>
                    Estado:
                    <input
                      type="text"
                      placeholder="(eje: activo o inactivo)"
                      value={couponNew.status}
                      onChange={(e) =>
                        setCouponNew({ ...couponNew, status: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className={Styles.inputsBox}>
                  <label>
                    Vencimiento:
                    <input
                      type="text"
                      placeholder="(eje: 25/12/2024)"
                      value={couponNew.expiration}
                      onChange={(e) =>
                        setCouponNew({
                          ...couponNew,
                          expiration: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className={Styles.inputsBox}>
                  <label>
                    Descuento:
                    <input
                      type="text"
                      placeholder="(eje: 0.20)"
                      value={couponNew.discount}
                      onChange={(e) =>
                        setCouponNew({ ...couponNew, discount: e.target.value })
                      }
                    />
                  </label>
                </div>
              </div>
              <div className={Styles.LadoB}>
                <div className={Styles.inputsBox}>
                  <label>
                    Cantidad de usos:
                    <input
                      type="text"
                      placeholder="(eje: 5 )"
                      value={couponNew.usagesAvailable}
                      onChange={(e) =>
                        setCouponNew({
                          ...couponNew,
                          usagesAvailable: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                <div className={Styles.inputsBox}>
                  <label>
                    Código validador:
                    <input
                      type="text"
                      placeholder="(eje: palabra codigo)"
                      value={couponNew.code}
                      onChange={(e) =>
                        setCouponNew({ ...couponNew, code: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className={Styles.inputsBox}>
                  <button
                    className={Styles.btn}
                    type="submit"
                    disabled={!isFormValid()}
                  >
                    Create Coupon
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={Styles.alineadorHijastro}>
          <h6>Cuponera</h6>
          <div className={Styles.hijastro}></div>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponForm;
