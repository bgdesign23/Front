import { useEffect, useState } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const UserTableComponent = ({ usuarios, onDeleteUser }) => {
  const [hot, setHot] = useState(null);

  useEffect(() => {
    if (usuarios) {
      if (hot) {
        hot.destroy();
        setHot(null);
      }

      const container = document.getElementById("handsontable-container");
      const newHot = new Handsontable(container, {
        data: usuarios,
        columns: [
          { data: "username", title: "Username" },
          { data: "location", title: "Location" },
          { data: "phone", title: "Phone" },
          { data: "email", title: "Email" },
          { data: "role", title: "Role" },

          {
            data: "action",
            title: "Action",
            renderer: (instance, td, row) => {
              const button = document.createElement("button");
              button.innerText = "Delete";
              button.addEventListener("click", () => {
                onDeleteUser(usuarios[row].id);
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
  }, [usuarios]);

  return <div id="handsontable-container"> </div>;
};

export default UserTableComponent;
