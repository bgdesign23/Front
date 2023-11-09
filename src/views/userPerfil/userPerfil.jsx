import FormUser from "./formUser/formUser.jsx";
import Menu from "../userPerfil/Menu/Menu.jsx";
import Styles from "../userPerfil/userPerfil.module.css";

const userPerfil = () => {
  return (
    <div className={Styles.containerAll}>
      <div className={Styles.boxLeft}>
        <Menu />
      </div>
      <div className={Styles.boxRight}>
        <FormUser />
      </div>
    </div>
  );
};

export default userPerfil;
