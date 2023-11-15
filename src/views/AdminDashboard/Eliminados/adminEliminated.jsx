import React, { useEffect, useRef } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const AdminsEliminatedTable = ({ adminsEliminated, handleRestoreAdmin }) => {
  const hotRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (hotRef.current) {
      hotRef.current.destroy();
    }

    if (containerRef.current) {
      const hot = new Handsontable(containerRef.current, {
        data: adminsEliminated,
        columns: [
          { data: "username", title: "Username" },
          { data: "email", title: "Email" },
          {
            data: "action",
            title: "Action",
            renderer: (instance, td, row) => {
              const button = document.createElement("button");
              button.innerText = "Restore";

              // Utiliza una función interna para manejar el clic y pasar el ID correcto
              const handleButtonClick = () => {
                handleRestoreAdmin(adminsEliminated[row].id);
              };

              button.addEventListener("click", handleButtonClick);

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
    }
  }, [adminsEliminated, handleRestoreAdmin]);

  // Actualiza la tabla cuando cambia adminsEliminated
  useEffect(() => {
    if (hotRef.current) {
      hotRef.current.loadData(adminsEliminated);
    }
  }, [adminsEliminated]);

  return <div ref={containerRef}></div>;
};

export default AdminsEliminatedTable;
