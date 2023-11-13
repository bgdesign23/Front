import { useNavigate } from "react-router-dom";
import stylesNotFound from "./NotFound404.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={stylesNotFound.divNotFound}>
      <h1 className={stylesNotFound.h1NotFound}>404</h1>
      <h2 className={stylesNotFound.h2NotFound}>Not Found</h2>
      <button
        className={stylesNotFound.btnNotFound}
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
};

export default NotFound;
