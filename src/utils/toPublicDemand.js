/**
 * Returns a demand object safe for anonymous visitors (no name/phone).
 */
const toPublicDemand = function (demand) {
  if (!demand) {
    return null;
  }

  const address = (demand.contactData && demand.contactData.address) || {};

  return {
    category: demand.category || '',
    demand: demand.demand || '',
    emergency: demand.emergency || '',
    createdTime: demand.createdTime || '',
    createdAt: demand.createdAt || null,
    completedTime: demand.completedTime || null,
    status: demand.status || '',
    assignedTo: demand.assignedTo || null,
    contactData: {
      address: {
        city: address.city || '',
        coords: address.coords || null,
        formattedAddress: address.formattedAddress || '',
      },
    },
  };
};

export default toPublicDemand;
