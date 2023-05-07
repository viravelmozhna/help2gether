const isLessThan24HoursAgo = (date) => {
  const twentyFourHrInMs = 24 * 60 * 60 * 1000;
  const twentyFourHoursAgo = Date.now() - twentyFourHrInMs;

  return new Date(date) > twentyFourHoursAgo;
};

export default isLessThan24HoursAgo;
