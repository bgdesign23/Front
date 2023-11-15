// validateCoupon.jsx
const cuponesDisponibles = [
  {
    code: 'black',
    description: 'Descuento Black',
    minPurchase: 10000,
  },
  {
    code: 'designblack',
    description: 'Descuento Design Black',
    minPurchase: 25000,
  },
  {
    code: 'bgdesign',
    description: 'Descuento BG Design',
    minPurchase: 0,
  },
];

const getCouponDetails = (couponCode) => {
  return cuponesDisponibles.find((cupon) => cupon.code === couponCode);
};

const isCouponValid = (code, total, applied) => {
  const couponDetails = getCouponDetails(code);

  if (couponDetails) {
    console.log("Detalles del cupón:", couponDetails);
    console.log("Total de la compra:", total);
    console.log("Cupones aplicados:", applied);
  }

  return couponDetails && couponDetails.minPurchase <= total && !applied.includes(code);
};

const validateCoupon = (couponCode, total, appliedCoupons) => {
  const couponDetails = getCouponDetails(couponCode);

  if (!couponDetails) {
    console.error("Cupón no válido");
    return false;
  }

  if (total < couponDetails.minPurchase) {
    console.error(`El importe mínimo para el cupón es de ${couponDetails.minPurchase}`);
    return false;
  }

  if (appliedCoupons.includes(couponCode)) {
    console.warn("Este cupón ya fue usado por el usuario");
    return false;
  }

  return isCouponValid(couponCode, total, appliedCoupons);
};

export { getCouponDetails, isCouponValid, validateCoupon };
