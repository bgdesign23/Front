import { useEffect, useRef } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const EliminatedProductsTable = ({
  isVisible,
  productsEliminated,
  handleRestoreProduct,
}) => {
  const hotRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById(
      "eliminated-products-handsontable-container"
    );
    const hot = new Handsontable(container, {
      data: productsEliminated,
      columns: [
        { data: "name", title: "Name" },
        { data: "description", title: "Description" },
        { data: "price", title: "Price" },
        {
          data: "action",
          title: "Action",
          renderer: (instance, td, row) => {
            const button = document.createElement("button");
            button.innerText = "Restore";
            button.addEventListener("click", () => {
              handleRestoreProduct(productsEliminated[row].id);
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
    return () => {
      if (hotRef.current) {
        hotRef.current.destroy();
      }
    };
  }, [isVisible, productsEliminated, handleRestoreProduct]);

  return <div id="eliminated-products-handsontable-container"></div>;
};

export default EliminatedProductsTable;
