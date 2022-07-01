export const filterProperties = {
  EMERGENCY: 'emergency',
  STATUS: 'status',
  CATEGORY: 'category',
  CITY: 'city',
};

export const filterPropertiesValues = {
  status: ['active', 'in progress', 'completed'],
  emergency: ['urgent', 'non-urgent'],
  category: ['food', 'clothes', 'medicines', 'other'],
};

export const modes = {
  EDIT: 'edit',
  SIGNUP: 'signup',
  ADD: 'add',
  MAP_VIEW: 'map',
  LIST_VIEW: 'list',
};

export const errors = {
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  WRONG_PASSWORD: 'auth/wrong-password',
  USER_NOT_FOUND: 'auth/user-not-found',
};

export const coords = {
  KHARKIV_COORDS: {
    lat: 49.9935,
    lng: 36.2304,
  },
};

export const zoomMapNumbers = {
  DEFAULT_VALUE: 17,
  DEMAND_FORM_ADD_MODE_VALUE: 13,
  MAP_LIST_VALUE: 11,
};
