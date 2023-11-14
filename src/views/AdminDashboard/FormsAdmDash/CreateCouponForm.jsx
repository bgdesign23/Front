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
      <div className={Styles.containerAlinea}>
        <h6>Crear un cupón descuento</h6>
        <div className={Styles.containerHijo}>
          <form onSubmit={handleCreateCoupon}>
            <div className={Styles.inputsBox}>
              <label>
                Status:
                <input
                  type="text"
                  placeholder="Example: activo"
                  value={couponNew.status}
                  onChange={(e) =>
                    setCouponNew({ ...couponNew, status: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={Styles.inputsBox}>
              <label>
                Expiration:
                <input
                  type="text"
                  placeholder="Example: 2023/10/20"
                  value={couponNew.expiration}
                  onChange={(e) =>
                    setCouponNew({ ...couponNew, expiration: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={Styles.inputsBox}>
              <label>
                Discount:
                <input
                  type="text"
                  placeholder="Example: 0.2"
                  value={couponNew.discount}
                  onChange={(e) =>
                    setCouponNew({ ...couponNew, discount: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={Styles.inputsBox}>
              <label>
                Usages Available:
                <input
                  type="text"
                  placeholder="Example: 1"
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
                Code:
                <input
                  type="text"
                  placeholder="Example: bgdesign2"
                  value={couponNew.code}
                  onChange={(e) =>
                    setCouponNew({ ...couponNew, code: e.target.value })
                  }
                />
              </label>
            </div>
            <button
              className={Styles.btn}
              type="submit"
              disabled={!isFormValid()}
            >
              Create Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponForm;
