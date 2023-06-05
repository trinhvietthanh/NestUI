export const AUTH_API_ROUTER = {
  LOGIN: '/auth/sign-in',
  LOGOUT: '/auth/sign-out',
};

export const COMPANY_API_ROUTER = {
  GET_LIST_COMPANY: '/api/company/list',
  GET_COMPANY: '/api/company/:id',
  CREATE_COMPANY: '/api/company',
  UPDATE_COMPANY: '/api/company',
  HISTORY_PRICE: '/api/company/chart',
};

export const USER_API_ROUTER = {
  GET_LIST_USER: '/user',
  GET_USER: '/user/:id',
  CREATE_USER: '/user',
  DELETE_USER: '/user',
  UPDATE_USER: '/user/:id',
};

export const TASK_API_ROUTER = {
  GET_LIST_TASKS: '/api/task',
  CREATE_TASK: '/api/task',
  UPDATE_TASK: '/api/task/:id',
};

export const ASSET_API_ROUTER = {
  GET_LIST_ASSETS: '/api/index-list',
  GET_DETAIL: '/api/index-list/:id',
  CREATE_ASSET: '/api/index-list',
};

export const REPORT_API_ROUTER = {
  GET_LIST_REPORT: '/api/report',
  GET_REPORT_DETAIL: '/api/report/:id',
  CREATE_REPORT: '/api/task/predict/:id',
};
