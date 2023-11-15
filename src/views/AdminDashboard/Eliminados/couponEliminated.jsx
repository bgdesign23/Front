import { useEffect, useRef } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const EliminatedCouponsTable = ({ couponsEliminated, handleRestoreCoupon }) => {
  const hotRef = useRef(null);

  useEffect(() => {
    if (hotRef.current) {
      hotRef.current.destroy();
    }

    const container = document.getElementById(
      "eliminated-coupons-handsontable-container"
    );
    const hot = new Handsontable(container, {
      data: couponsEliminated,
      columns: [
        { data: "code", title: "Code" },
        { data: "description", title: "Description" },
        {
          data: "action",
          title: "Action",
          renderer: (instance, td, row) => {
            const button = document.createElement("button");
            button.innerText = "Restore";
            button.addEventListener("click", () => {
              handleRestoreCoupon(couponsEliminated[row].id);
            });

            while (td.firstChild) {
              td.removeChild(td.firstChild);
            }
            td.appendChild(button);
          },
        },
      ],
      rowHeaders: true,
      colHeaders: true,
      height: "auto",
      licenseKey: "non-commercial-and-evaluation",
    });

    hotRef.current = hot;
  }, [couponsEliminated, handleRestoreCoupon]);

  return <div id="eliminated-coupons-handsontable-container"></div>;
};

export default EliminatedCouponsTable;
