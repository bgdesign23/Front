const Logout = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400px"
        height="20px"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        >
          <path
            strokeDasharray="32"
            strokeDashoffset="32"
            d="M12 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H12"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.4s"
              values="32;0"
            />
          </path>
          <path
            strokeDasharray="12"
            strokeDashoffset="12"
            d="M9 12h11.5"
            opacity="0"
          >
            <set attributeName="opacity" begin="0.5s" to="1" />
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.5s"
              dur="0.2s"
              values="12;0"
            />
          </path>
          <path
            strokeDasharray="6"
            strokeDashoffset="6"
            d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"
            opacity="0"
          >
            <set attributeName="opacity" begin="0.7s" to="1" />
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.7s"
              dur="0.2s"
              values="6;0"
            />
          </path>
        </g>
      </svg>
    </div>
  );
};

export default Logout;
