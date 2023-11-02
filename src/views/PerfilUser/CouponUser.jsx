import React from 'react';
import { useSelector } from 'react-redux';

function CuponesPage() {
  const userCoupons = useSelector((state) => state.userCoupons);

  return (
    <div>
      <h1>Tus Cupones Disponibles</h1>
      <ul>
        {userCoupons.map((coupon) => (
          <li key={coupon.id}>
            {coupon.name} - Descuento: {coupon.discount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CuponesPage;

