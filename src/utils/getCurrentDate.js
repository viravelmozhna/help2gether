const getCurrentDate = () => {
  const date = new Date();
  const [day, month, year] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];
  return `${day.toString().padStart(2, '0')}.${(month + 1)
    .toString()
    .padStart(2, '0')}.${year}`;
};

export default getCurrentDate;
