import React, { useEffect, useState } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const CouponTableComponent = ({ coupons, onDeleteCoupon }) => {
  const [hot, setHot] = useState(null);

  useEffect(() => {
    if (coupons) {
      if (hot) {
        hot.destroy();
        setHot(null);
      }

      const container = document.getElementById(
        "coupons-handsontable-container"
      );
      const newHot = new Handsontable(container, {
        data: coupons,
        columns: [
          { data: "code", title: "Code" },
          { data: "status", title: "Status" },
          { data: "discount", title: "Discount" },
          { data: "expiration", title: "Expiration" },
          { data: "usagesAvailable", title: "Usages Available" },
          {
            data: "action",
            title: "Action",
            renderer: (instance, td, row) => {
              const deleteButton = document.createElement("button");
              deleteButton.innerText = "Delete";
              deleteButton.addEventListener("click", () => {
                onDeleteCoupon(coupons[row].id);
              });

              while (td.firstChild) {
                td.removeChild(td.firstChild);
              }

              td.appendChild(deleteButton);
            },
          },
        ],
        rowHeaders: true,
        colHeaders: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
      });

      newHot.addHook("afterOnCellMouseDown", (event, coords, TD) => {
        if (TD.classList.contains("htButton")) {
          event.stopImmediatePropagation();
        }
      });

      setHot(newHot);
    }
  }, [coupons, onDeleteCoupon]);

  return <div id="coupons-handsontable-container"></div>;
};

export default CouponTableComponent;
