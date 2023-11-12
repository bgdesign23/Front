import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCoupon, clearErrors } from "../../../Redux/actions";
import Swal from "sweetalert2";

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
    <form onSubmit={handleCreateCoupon}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <label>
        Status:
        <input
          type="text"
          value={couponNew.status}
          onChange={(e) =>
            setCouponNew({ ...couponNew, status: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Expiration:
        <input
          type="text"
          value={couponNew.expiration}
          onChange={(e) =>
            setCouponNew({ ...couponNew, expiration: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Discount:
        <input
          type="text"
          value={couponNew.discount}
          onChange={(e) =>
            setCouponNew({ ...couponNew, discount: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Usages Available:
        <input
          type="text"
          value={couponNew.usagesAvailable}
          onChange={(e) =>
            setCouponNew({ ...couponNew, usagesAvailable: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Code:
        <input
          type="text"
          value={couponNew.code}
          onChange={(e) => setCouponNew({ ...couponNew, code: e.target.value })}
        />
      </label>
      <br />
      <button type="submit" disabled={!isFormValid()}>
        Create Coupon
      </button>
    </form>
  );
};

export default CreateCouponForm;
