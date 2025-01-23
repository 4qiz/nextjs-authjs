export const routes = {
  signIn: () => `/auth/login`,
  signUp: () => `/auth/register`,
  authError: () => `/auth/error`,
  authNewVerification: () => `/auth/new-verification`,
  apiAuthPrefix: () => `/api/auth`,
  settings: () => `/settings`,
  home: () => `/`,
};

export const publicRoutes = [routes.home(), routes.authNewVerification()];
export const authRoutes = [
  routes.signIn(),
  routes.signUp(),
  routes.authError(),
];
export const apiAuthPrefix = routes.apiAuthPrefix();
export const DEFAULT_LOGIN_REDIRECT_URL = routes.settings();
