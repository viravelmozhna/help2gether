import constants from '@/env/constants';

const filterDemands = function (demands, propertyName, propertyValue) {
  if (propertyValue.length > 0) {
    if (propertyName === constants.REGION) {
      const filteredListOfDemands = demands.filter((demand) => {
        return propertyValue.includes(demand[1].contactData.address.region.toLowerCase());
      });
      return filteredListOfDemands;
    };

    if (propertyName === constants.EMERGENCY) {
      const filteredListOfDemands = demands.filter((demand) => {
        return propertyValue.includes(demand[1].emergency);
      });
      return filteredListOfDemands;
    }

    const filteredListOfDemands = demands.filter((demand) => {
      return propertyValue.includes(demand[1][propertyName]);
    });

    return filteredListOfDemands;
  };

  return demands;
};

export default filterDemands;
