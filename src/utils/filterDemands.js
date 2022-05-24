import constants from '../env/constants';

const filterDemands = function (demands, property, filterBy) {
  if (property) {
    if (filterBy === constants.REGION) {
      const filteredListOfDemands = demands.filter((demand) => {
        return demand[1].contactData.address.region.toLowerCase() === property.toLowerCase();
      });
      return filteredListOfDemands;
    };

    if (filterBy === constants.EMERGENCY) {
      const filteredListOfDemands = demands.filter((demand) => {
        return demand[1].emergency === property && demand[1].status === 'active';
      });
      return filteredListOfDemands;
    }

    const filteredListOfDemands = demands.filter((demand) => {
      return demand[1][filterBy] === property;
    });

    return filteredListOfDemands;
  };

  return demands;
};

export default filterDemands;
