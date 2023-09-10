const ArrowNav = ({
  reverse,
  onClick,
}: {
  reverse: boolean;
  onClick?: () => void;
}) => {
  return (
    <svg
      onClick={onClick}
      style={{ transform: `rotate(${reverse ? "180deg" : "0"})` }}
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ArrowNav;
