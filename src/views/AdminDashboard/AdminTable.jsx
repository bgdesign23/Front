// AdminTableComponent.js
import { useEffect, useState } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const AdminTableComponent = ({
  admins,
  onDeleteAdmin,
  onRestoreAdmin,
  onEditAdmin,
}) => {
  const [hot, setHot] = useState(null);

  useEffect(() => {
    if (admins) {
      if (hot) {
        hot.destroy();
        setHot(null);
      }

      const container = document.getElementById(
        "admins-handsontable-container"
      );
      const newHot = new Handsontable(container, {
        data: admins,
        columns: [
          { data: "username", title: "Username" },
          { data: "location", title: "Location" },
          { data: "phone", title: "Phone" },
          { data: "email", title: "Email" },
          {
            data: "action",
            title: "Action",
            renderer: (instance, td, row) => {
              const deleteButton = document.createElement("button");
              deleteButton.innerText = "Delete";
              deleteButton.addEventListener("click", () => {
                onDeleteAdmin(admins[row].id);
              });

              const restoreButton = document.createElement("button");
              restoreButton.innerText = "Restore";
              restoreButton.addEventListener("click", () => {
                onRestoreAdmin(admins[row].id);
              });

              const editButton = document.createElement("button");
              editButton.innerText = "Edit";
              editButton.addEventListener("click", () => {
                onEditAdmin(admins[row].id);
              });

              while (td.firstChild) {
                td.removeChild(td.firstChild);
              }

              if (admins[row].deleted) {
                td.appendChild(restoreButton);
              } else {
                td.appendChild(editButton);
                td.appendChild(deleteButton);
              }
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
  }, [admins, onDeleteAdmin, onRestoreAdmin, onEditAdmin]);

  return <div id="admins-handsontable-container"> </div>;
};

export default AdminTableComponent;
