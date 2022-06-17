export const filterProperties = {
  EMERGENCY: 'emergency',
  STATUS: 'status',
  CATEGORY: 'category',
  REGION: 'region',
};

export const filterPropertiesValues = {
  status: ['active', 'in progress', 'completed'],
  emergency: ['urgent', 'non-urgent'],
  category: ['food', 'clothes', 'medicines', 'other'],
};

export const regions = [
  'Cherkasy',
  'Chernihiv',
  'Chernivtsi',
  'Dnipropetrovsk',
  'Donetsk',
  'Ivano-Frankivsk',
  'Kharkiv',
  'Kherson',
  'Khmelnytskyi',
  'Kyiv',
  'Kirovohrad',
  'Luhansk',
  'Lviv',
  'Mykolaiv',
  'Odessa',
  'Poltava',
  'Rivne',
  'Sumy',
  'Ternopil',
  'Vinnytsia',
  'Volyn',
  'Zakarpattia',
  'Zaporizhzhia',
  'Zhytomyr',
];

export const modes = {
  EDIT: 'edit',
  SIGNUP: 'signup',
  ADD: 'add',
};

export const errors = {
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  WRONG_PASSWORD: 'auth/wrong-password',
  USER_NOT_FOUND: 'auth/user-not-found',
};
