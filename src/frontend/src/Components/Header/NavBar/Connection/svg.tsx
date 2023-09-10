export const Cross = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg viewBox="0 0 21 21" onClick={onClick}>
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(5 5)"
      >
        <path d="m.5 10.5 10-10" />
        <path d="m10.5 10.5-10-10z" />
      </g>
    </svg>
  );
};
