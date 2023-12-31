import { useEffect, useRef } from "react";
import Handsontable from "handsontable";

import "handsontable/dist/handsontable.full.min.css";

const TableComponent = ({
  productos,
  prodRef,
  handleDeleteProduct,
  handleEditProduct,
}) => {
  const hotRef = useRef(null);

  useEffect(() => {
    if (productos) {
      const container = document.getElementById("handsontable-container");

      if (!hotRef.current) {
        const newHot = new Handsontable(container, {
          data: productos,
          columns: [
            { data: "name", title: "Names" },
            { data: "description", title: "Description" },
            { data: "type", title: "Type" },
            { data: "material", title: "Material" },
            { data: "price", title: "Price" },
            { data: "stock", title: "Stock" },
            { data: "color", title: "Color" },
            { data: "image", title: "Image" },
            {
              data: "action",
              title: "Action",
              renderer: (instance, td, row) => {
                const editButton = document.createElement("button");
                editButton.innerText = "Editar";

                const button = document.createElement("button");
                button.innerText = "Delete";

                editButton.addEventListener("click", (event) => {
                  console.log("Entrando al evento: ", productos[row]);
                  handleEditProduct(
                    event,
                    productos[row].id,
                    prodRef,
                    productos[row]
                  );
                });
                button.addEventListener("click", () => {
                  handleDeleteProduct(productos[row].id);
                });

                while (td.firstChild) {
                  td.removeChild(td.firstChild);
                }
                td.appendChild(editButton);
                td.appendChild(button);
              },
            },
          ],
          rowHeaders: true,
          colHeaders: true,
          height: "auto",
          licenseKey: "non-commercial-and-evaluation",
          afterChange: (changes, source) => {
            if (
              source === "edit" ||
              source === "autofill" ||
              source === "paste"
            ) {
              const [changeRow, changeProp, oldValue, newValue] = changes[0];
              console.log("After change: ", prodRef);
              prodRef = {
                ...prodRef,
                [changeProp]: newValue,
              };
            }
          },
        });

        hotRef.current = newHot;
      } else {
        hotRef.current.loadData(productos);
      }
    }

    return () => {
      if (hotRef.current) {
        hotRef.current.destroy();
        hotRef.current = null;
      }
    };
  }, [productos]);

  return (
    <>
      <div id="handsontable-container"></div>
    </>
  );
};

export default TableComponent;
