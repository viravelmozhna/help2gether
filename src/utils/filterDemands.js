import constants from '@/env/constants';

const filterDemands = function (demands, propertyName, propertyValue) {
  if (propertyValue) {
    if (propertyName === constants.REGION) {
      const filteredListOfDemands = demands.filter((demand) => {
        return demand[1].contactData.address.region.toLowerCase() === propertyValue.toLowerCase();
      });
      return filteredListOfDemands;
    };

    if (propertyName === constants.EMERGENCY) {
      const filteredListOfDemands = demands.filter((demand) => {
        return demand[1].emergency === propertyValue && demand[1].status === 'active';
      });
      return filteredListOfDemands;
    }

    const filteredListOfDemands = demands.filter((demand) => {
      return demand[1][propertyName] === propertyValue;
    });

    return filteredListOfDemands;
  };

  return demands;
};

export default filterDemands;
