import { filterProperties } from '@/env/constants';

const filterDemands = function (demands, propertyName, propertyValue) {
  if (propertyValue.length > 0) {
    if (propertyName === filterProperties.CITY) {
      const filteredListOfDemands = demands.filter((demand) => {
        return propertyValue.includes(demand[1].contactData.address.city.toLowerCase());
      });
      return filteredListOfDemands;
    };

    if (propertyName === filterProperties.EMERGENCY) {
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
