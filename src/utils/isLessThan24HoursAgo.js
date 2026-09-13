// Parses the legacy "DD.MM.YYYY" createdTime string as local midnight of that day
const parseDayString = (dayString) => {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(dayString || '');
  if (!match) {
    return null;
  }
  const [, day, month, year] = match;
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
};

// createdAt: ms timestamp (demands created after this fix); createdTime: "DD.MM.YYYY" fallback
const isLessThan24HoursAgo = (createdAt, createdTime) => {
  const twentyFourHrInMs = 24 * 60 * 60 * 1000;
  const createdMs = typeof createdAt === 'number' ? createdAt : parseDayString(createdTime);

  return createdMs !== null && Date.now() - createdMs < twentyFourHrInMs;
};

export default isLessThan24HoursAgo;
