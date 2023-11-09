import { useEffect, useState } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const TableComponent = ({ productos, handleDeleteProduct }) => {
  const [hot, setHot] = useState(null);

  useEffect(() => {
    if (productos) {
      if (hot) {
        hot.destroy();
        setHot(null);
      }

      const container = document.getElementById("handsontable-container");
      const newHot = new Handsontable(container, {
        data: productos,
        columns: [
          { data: "name", title: "Name" },
          { data: "stock", title: "Stock" },
          { data: "price", title: "Price" },
          { data: "type", title: "Type" },
          { data: "material", title: "Material" },
          { data: "description", title: "description" },
          {
            data: "action",
            title: "Action",
            renderer: (instance, td, row) => {
              const button = document.createElement("button");
              button.innerText = "Delete";
              button.addEventListener("click", () => {
                handleDeleteProduct(productos[row].id);
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

      newHot.addHook("afterOnCellMouseDown", (event, coords, TD) => {
        if (TD.classList.contains("htButton")) {
          event.stopImmediatePropagation();
        }
      });

      setHot(newHot);
    }
  }, [productos]);

  return <div id="handsontable-container"></div>;
};
export default TableComponent;
