// by default routes is private
export const routes = {
  signIn: () => `/auth/login`,
  signUp: () => `/auth/register`,
  authReset: () => `/auth/reset`,
  authError: () => `/auth/error`,
  authNewVerification: () => `/auth/new-verification`,
  authNewPassword: () => `/auth/new-password`,
  apiAuthPrefix: () => `/api/auth`,
  settings: () => `/settings`,
  home: () => `/`,
};

// allowed for all
export const publicRoutes = [routes.home(), routes.authNewVerification()];

// allowed for non authenticated users
export const authRoutes = [
  routes.signIn(),
  routes.signUp(),
  routes.authError(),
  routes.authReset(),
  routes.authNewPassword(),
];
export const apiAuthPrefix = routes.apiAuthPrefix();
export const DEFAULT_LOGIN_REDIRECT_URL = routes.settings();
