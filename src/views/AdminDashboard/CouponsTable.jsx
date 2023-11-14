import { useEffect, useRef } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const CouponTableComponent = ({ coupons, onDeleteCoupon, onEditCoupon }) => {
  const hotRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById("coupons-handsontable-container");

    if (!hotRef.current) {
      hotRef.current = new Handsontable(container, {
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

              const editButton = document.createElement("button")
              editButton.innerText = "Edit"

              editButton.addEventListener("click", (event) => {
                onEditCoupon(
                  event,                   
                  coupons[row].id,
                  coupons[row]
                )
              })

              deleteButton.addEventListener("click", (event) => {
                event.preventDefault();
                onDeleteCoupon(coupons[row].id);
              });

              while (td.firstChild) {
                td.removeChild(td.firstChild);
              }

              td.appendChild(deleteButton);
              td.appendChild(editButton)
            },
          },
        ],
        rowHeaders: true,
        colHeaders: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
      });

      hotRef.current.addHook("afterOnCellMouseDown", (event, coords, TD) => {
        if (TD.classList.contains("htButton")) {
          event.stopImmediatePropagation();
        }
      });
    } else {
      hotRef.current.loadData(coupons);
      hotRef.current.render();
    }

    return () => {
      if (hotRef.current) {
        hotRef.current.destroy();
        hotRef.current = null;
      }
    };
  }, [coupons, onDeleteCoupon]);

  return <div id="coupons-handsontable-container"></div>;
};

export default CouponTableComponent;
