const hasValidCoords = function (coords) {
  return Boolean(coords && typeof coords.lat === 'number' && typeof coords.lng === 'number' && !Number.isNaN(coords.lat) && !Number.isNaN(coords.lng));
};

export default hasValidCoords;
