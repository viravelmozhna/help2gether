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
      request: 'One bread, 1 kg potatoes',
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
        city: 'Tzyrkuny',
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
        city: 'Kahrkiv',
        street: 'Pushkinska vul. 29',
      },
      request: 'Insulin',
    },
    categorie: 'medicine',
    emergency: 'urgent',
    status: 'in progress',
  },
];

export default requestsList;
