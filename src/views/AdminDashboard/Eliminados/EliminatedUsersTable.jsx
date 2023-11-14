import { useEffect, useRef } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

const EliminatedUsersTable = ({ usersEliminated, handleRestoreUser }) => {
  const hotRef = useRef(null);

  useEffect(() => {
    if (hotRef.current) {
      hotRef.current.destroy();
    }

    const container = document.getElementById(
      "eliminated-users-handsontable-container"
    );
    const hot = new Handsontable(container, {
      data: usersEliminated,
      columns: [
        { data: "username", title: "Username" },
        { data: "email", title: "Email" },
        { data: "role", title: "Role" },
        {
          data: "action",
          title: "Action",
          renderer: (instance, td, row) => {
            const button = document.createElement("button");
            button.innerText = "Restore";
            button.addEventListener("click", () => {
              handleRestoreUser(usersEliminated[row].id);
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
  }, [usersEliminated, handleRestoreUser]);

  return <div id="eliminated-users-handsontable-container"></div>;
};

export default EliminatedUsersTable;
