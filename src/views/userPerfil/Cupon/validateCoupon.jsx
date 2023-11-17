export const coupons = [
  
  {

    id: 2,
    status: "activo",
    expiration:"2024-12-12",
    titulo: "Descuento Black",
    descripcion: "En tu compra superior a $10.000 tienes un descuento del 15%",
    codigo: "black",
    descuento: 0.15,
    montoMinimo: 10000,
    usadoPorUsuarios: [],
  },
  {
        
    id: 3,
    titulo: "Descuento Designblack",
    status: "activo",
    expiration:"2024-12-12",
    descripcion: "En tu compra superior a $45.000 tienes un descuento del 30%",
    codigo: "designblack",
    descuento: 0.3,
    montoMinimo: 25000,
    usadoPorUsuarios: [],
  },
];

export const isCouponValid = (couponCode, cartTotal, appliedCoupons, userId) => {
  const coupon = coupons.find((coupon) => coupon.codigo === couponCode);

  if (!coupon) {
    return { isValid: false, message: "Cupón no válido" };
  }

  if (coupon.status !== "activo") {
    return { isValid: false, message: "Este cupón no está activo" };
  }

  if (appliedCoupons.includes(coupon.codigo)) {
    return { isValid: false, message: "Este cupón ya fue aplicado" };
  }

  if (coupon.usadoPorUsuarios.includes(userId)) {
    return { isValid: false, message: "Este cupón ya fue utilizado por este usuario" };
  }

  if (coupon.expiration && new Date(coupon.expiration) < new Date()) {
    return { isValid: false, message: "Este cupón ha vencido" };
  }

  if (coupon.montoMinimo && cartTotal < coupon.montoMinimo) {
    return {
      isValid: false,
      message: `La compra debe ser superior a $${coupon.montoMinimo} para aplicar este cupón`,
    };
  }

  let discountedTotal = cartTotal;
  if (coupon.descuento) {
    discountedTotal = cartTotal - cartTotal * coupon.descuento;
  }

  return { isValid: true, discountedTotal, coupon };
};