import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
// import { Log } from 'oidc-client-ts';

// Log.setLogger(console);
// Log.setLevel(Log.DEBUG);

const settings = {
    authority: process.env.REACT_APP_AUTHORITY, // 認可サーバのURL
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    response_type: 'code',
    scope: process.env.REACT_APP_SCOPE,
    post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI, // ログアウト後のリダイレクトURI
    filterProtocolClaims: true,
    loadUserInfo: true,
    // ストレージの設定を必要に応じて調整
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    stateStore: new WebStorageStateStore({ store: window.localStorage }),
  };

const userManager = new UserManager(settings);

// OpenID Connect (OIDC) の認可コードフローを開始する
// ユーザーを認可サーバ（認証サーバ）のログインページにリダイレクトする
export function signinRedirect() {
  return userManager.signinRedirect();
}

// 認可サーバからの応答を処理し、ユーザー情報とトークンを取得する
export function signinRedirectCallback() {
  return userManager.signinRedirectCallback();
}

export function signoutRedirect() {
  return userManager.signoutRedirect();
}

export function signoutRedirectCallback() {
  return userManager.signoutRedirectCallback();
}

export function getUser() {
  return userManager.getUser();
}

export function renewToken() {
  return userManager.signinSilent();
}
