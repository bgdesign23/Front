import { useEffect, useRef } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const ComponentAdminTable = ({
  admins,
  onDeleteAdmin,
  onRestoreAdmin,
  onEditAdmin,
}) => {
  const hotRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById("admin-handsontable-container");

    if (!hotRef.current) {
      const newHot = new Handsontable(container, {
        data: admins,
        columns: [
          { data: "username", title: "Username" },
          { data: "phone", title: "Phone" },
          { data: "email", title: "Email" },
          { data: "password", title: "Password" },
          { data: "role", title: "Role" },

          {
            data: "action",
            title: "Action",
            renderer: (instance, td, row) => {
              const editButton = document.createElement("button");
              editButton.innerText = "Edit";

              const deleteButton = document.createElement("button");
              deleteButton.innerText = "Delete";

              const restoreButton = document.createElement("button");
              restoreButton.innerText = "Restore";

              editButton.addEventListener("click", () =>
                onEditAdmin(admins[row].id)
              );
              deleteButton.addEventListener("click", () =>
                onDeleteAdmin(admins[row].id)
              );
              restoreButton.addEventListener("click", () =>
                onRestoreAdmin(admins[row].id)
              );

              while (td.firstChild) {
                td.removeChild(td.firstChild);
              }

              td.appendChild(editButton);
              td.appendChild(deleteButton);
              td.appendChild(restoreButton);
            },
          },
        ],
        rowHeaders: true,
        colHeaders: true,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
      });

      hotRef.current = newHot;
    } else {
      hotRef.current.loadData(admins);
    }

    return () => {
      if (hotRef.current) {
        hotRef.current.destroy();
        hotRef.current = null;
      }
    };
  }, [admins]);

  return (
    <div>
      <div id="admin-handsontable-container"></div>
    </div>
  );
};

export default ComponentAdminTable;
