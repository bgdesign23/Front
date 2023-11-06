import style from "../../../App.module.css";

export default function ButtonSide({ toggleSideBar }) {
  return (
    <button className={style.toggleButton} onClick={toggleSideBar}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20 10.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5Zm0-4H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5Zm0 8H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5Zm0 4H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5Z"
        />
      </svg>
    </button>
  );
}
