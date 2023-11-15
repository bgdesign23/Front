import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoupon,
  clearErrors,
  getUserCoupons,
  deleteCoupon,
} from "../../../Redux/actions.js";
import Swal from "sweetalert2";
import Styles from "../FormsAdmDash/cuponForm.module.css";
import CouponTableComponent from "../CouponsTable.jsx";

const CreateCouponForm = () => {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.userCoupons);

  const handleDeleteCoupon = (id) => {
    dispatch(deleteCoupon(id))
      .then(() => {
        // Operación después de eliminar el cupón
        dispatch(getUserCoupons());
        setUpdated(!updated);
      })
      .catch((error) => {
        // Manejar errores si es necesario
        console.error("Error deleting coupon:", error);
      });
  };

  const [errors, setErrors] = useState({});
  const [couponNew, setCouponNew] = useState({
    status: "",
    expiration: "",
    discount: "",
    usagesAvailable: "",
    code: "",
  });

  const isFormValid = () => {
    const numberAndSigns = /^[\d.,/]+$/;
    return (
      couponNew.status &&
      numberAndSigns.test(couponNew.expiration) &&
      numberAndSigns.test(couponNew.discount) &&
      numberAndSigns.test(couponNew.usagesAvailable) &&
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
          <div className={Styles.containerHijo}>
            <h6>Crear un cupón descuento</h6>
            <form className={Styles.formu} onSubmit={handleCreateCoupon}>
              <div className={Styles.LadoA}>
                <div className={Styles.inputsBox}>
                  <label>
                    Estado:
                    <input
                      type="text"
                      placeholder="ejemplo: Activo"
                      value={couponNew.status}
                      onChange={(e) =>
                        setCouponNew({ ...couponNew, status: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className={Styles.inputsBox}>
                  <label>
                    Caducidad:
                    <input
                      type="text"
                      placeholder="ejemplo: 2023/10/20"
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
                    Porcentaje descuento:
                    <input
                      type="text"
                      placeholder="ejemplo: 0.2"
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
                      placeholder="ejemplo: 1"
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
                    Código valido:
                    <input
                      type="text"
                      placeholder="ejemplo: bgdesign2"
                      value={couponNew.code}
                      onChange={(e) =>
                        setCouponNew({ ...couponNew, code: e.target.value })
                      }
                    />
                  </label>
                </div>

                <div className={Styles.inputsBox}></div>
              </div>
              <button
                className={Styles.btn}
                type="submit"
                disabled={!isFormValid()}
              >
                Crear cupón
              </button>
            </form>
          </div>
        </div>

        <div className={Styles.alineadorHijastro}>
          <div className={Styles.hijastro}>
            <h6>Cuponera</h6>

            <div className={Styles.tablaCupones}>
              <CouponTableComponent
                coupons={coupon}
                onDeleteCoupon={handleDeleteCoupon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponForm;
