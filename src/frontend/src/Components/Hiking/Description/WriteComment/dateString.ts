export const dateString = () => {
  const date = new Date();

  const month = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  return (
    date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()
  );
};
