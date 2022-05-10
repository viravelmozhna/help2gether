const requestsList = [
  {
    id: 1,
    data: {
      name: 'Taras Boiko',
      phone: '+38-097-123-45-67',
      address: {
        region: 'Kharkiv region',
        city: 'Kutuzivka',
        street: 'Shkilna vul. 4',
      },
      request: '1 bread, 1 kg potatoes',
    },
    categorie: 'food',
    emergency: 'urgent',
    status: 'active',
  },
  {
    id: 2,
    data: {
      name: 'Stefania Dyka',
      phone: '+38-098-456-78-90',
      address: {
        region: 'Kharkiv region',
        city: 'Kutuzivka',
        street: 'Veselkova vul. 1',
      },
      request: '1 kg potatoes, tomatoes and cucumbers',
    },
    categorie: 'food',
    emergency: 'urgent',
    status: 'active',
  },
  {
    id: 3,
    data: {
      name: 'Stefania Dyka',
      phone: '+38-098-456-78-90',
      address: {
        region: 'Kharkiv region',
        city: 'Kutuzivka',
        street: 'Veselkova vul. 1',
      },
      request: 'L-Thyroxin 100mg, Berlin-Chemie',
    },
    categorie: 'medicines',
    emergency: 'urgent',
    status: 'active',
  },
  {
    id: 4,
    data: {
      name: 'Lidiya Mykytiv',
      phone: '+38-063-789-12-34',
      address: {
        region: 'Kharkiv region',
        city: 'Tsyrkuny',
        street: 'Vyshneva vul. 1',
      },
      request: 'Jeans and two t-shirts for 4 years old girl',
    },
    categorie: 'clothes',
    emergency: 'non-urgent',
    status: 'active',
  },
  {
    id: 5,
    data: {
      name: 'Pavlo Danyljuk',
      phone: '+38-063-567-89-10',
      address: {
        region: 'Kharkiv region',
        city: 'Tsyrkuny',
        street: 'Sadova vul. 1',
      },
      request: 'Insulin',
    },
    categorie: 'medicine',
    emergency: 'urgent',
    status: 'in progress',
  },
  {
    id: 6,
    data: {
      name: 'Hanna Petriv',
      phone: '+38-050-234-56-78',
      address: {
        region: 'Kharkiv region',
        city: 'Kharkiv',
        street: 'Pushkinska vul. 29',
      },
      request: 'Insulin',
    },
    categorie: 'medicine',
    emergency: 'urgent',
    status: 'in progress',
  },
  {
    id: 7,
    data: {
      name: 'Svitlana Boiko',
      phone: '+38-050-987-65-43',
      address: {
        region: 'Kharkiv region',
        city: 'Kharkiv',
        street: 'Traktorobudivnykiv pr. 127',
      },
      request: '5l water, 1 bread, 1kg buckwheat',
    },
    categorie: 'food',
    emergency: 'urgent',
    status: 'active',
  },
  {
    id: 8,
    data: {
      name: 'Mariya Linnyk',
      phone: '+38-096-219-87-65',
      address: {
        region: 'Kharkiv region',
        city: 'Kharkiv',
        street: 'Traktorobudivnykiv pr. 129',
      },
      request: 'L-Thyroxin 50mg',
    },
    categorie: 'medicine',
    emergency: 'urgent',
    status: 'active',
  },
  {
    id: 9,
    data: {
      name: 'Marina Stepaniv',
      phone: '+38-097-432-10-78',
      address: {
        region: 'Kharkiv region',
        city: 'Kharkiv',
        street: 'Traktorobudivnykiv pr. 129',
      },
      request: 'Sweater for 70 y.o. woman, size 48, and 2 warm blankets',
    },
    categorie: 'clothes',
    emergency: 'non-urgent',
    status: 'active',
  },
  {
    id: 10,
    data: {
      name: 'Marina Danilenkova',
      phone: '+38-097-789-45-65',
      address: {
        region: 'Kharkiv region',
        city: 'Kharkiv',
        street: 'Y.Mudrogo vul. 35',
      },
      request: 'Any toys for 3 y.o. boy',
    },
    categorie: 'other',
    emergency: 'non-urgent',
    status: 'active',
  },
  {
    id: 11,
    data: {
      name: 'Stepan Golovko',
      phone: '+38-063-729-45-65',
      address: {
        region: 'Kharkiv region',
        city: 'Kharkiv',
        street: 'Pushkinska vul. 35',
      },
      request: 'Cat food (5 cats)',
    },
    categorie: 'other',
    emergency: 'urgent',
    status: 'in progress',
  },
  {
    id: 12,
    data: {
      name: 'Inna Olegko',
      phone: '+38-093-159-26-48',
      address: {
        region: 'Kharkiv region',
        city: 'Kharkiv',
        street: 'Pushkinska vul. 69',
      },
      request: 'Cat food 1kg',
    },
    categorie: 'other',
    emergency: 'urgent',
    status: 'completed',
  },
];

export default requestsList;
