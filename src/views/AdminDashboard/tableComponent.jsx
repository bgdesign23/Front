import { useEffect, useState, useRef } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";
import { editProduct } from "../../Redux/actions";

const TableComponent = ({ 
  productos, 
  handleDeleteProduct,
  handleEditProduct,
  // handleRestoreProduct,
}) => {
  const [hot, setHot] = useState(null);
  const prodRef = useRef({
    name: "",
    stock: "",
    price: "",
    type: "",
    material: "",
    description: "",
  });

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
              const editButton = document.createElement("button");
              editButton.innerText = "Edit";
              editButton.addEventListener("click", (event) => {
                if (productos[row] && typeof handleEditProduct === 'function') {
                  prodRef.current = ({ ...productos[row] });
                  handleEditProduct(event, productos[row].id);
                }
              });

              const button = document.createElement("button");
              button.innerText = "Delete";
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
          if (source === "edit" || source === "autofill" || source === "paste") {
            const [changeRow, changeProp, oldValue, newValue] = changes[0];
            prodRef.current = {
              ...prodRef.current,
              [changeProp]: newValue,
            };
          }
        },
      });

      newHot.addHook("afterOnCellMouseDown", (event, coords, TD) => {
        if (TD.classList.contains("htButton")) {
          event.stopImmediatePropagation();
        }
      });

      setHot(newHot);
    }
  }, [productos]);
    // Nuevo useEffect para manejar la actualización de datos
    // useEffect(() => {
    //   if (hot) {
    //     hot.loadData(productos); // Cargar nuevos datos en la tabla
    //   }
    // }, [productos, hot]);

  return <div id="handsontable-container"></div>;
};

export default TableComponent;
