
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_ERROR } from 'react-admin';
import { apolloClient } from './dataProvider'
import gql from 'graphql-tag';
import jsSHA from 'jssha'

function login(params) {
  const { username, password } = params;
  const shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.update(password);

  return apolloClient.mutate({
    mutation: gql`
    mutation login {
      login(username:"${username}",password:"${shaObj.getHash("HEX")}"){
        success
        error
        token
      }
    }
  `,
  })
    .then(({ data: { login } }) => {
      if (login.success) {
        localStorage.setItem('token', login.token)
        localStorage.setItem('role', login.token)
      }
      else
        throw new Error(login.error);
    });
}

function logout(token) {
  return apolloClient.mutate({
    mutation: gql`
    mutation logout {
      logout(token:"${token}"){
        success
        error
      }
    }
  `,
  })
}

function auth(type, params) {
  switch (type) {
    case AUTH_LOGIN:
      return login(params);
    case AUTH_LOGOUT:
      const oldToken = localStorage.getItem('token');
      if (oldToken) {
        logout(oldToken)
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
      return Promise.resolve();
    case AUTH_CHECK:
      const token = localStorage.getItem('token')
      return token ? Promise.resolve() : Promise.reject();
    case AUTH_GET_PERMISSIONS:
      const role = localStorage.getItem('role');
      return role ? Promise.resolve() : Promise.reject();
    case AUTH_ERROR:
      //如果是token问题，需重新登录，否则返回resolve
      return params.graphQLErrors.some(error => error.errorCode === 'TokenError') ? Promise.reject() : Promise.resolve();
    default:
      return Promise.reject(`Unkown type: $(type)`);
  }
}

export default auth;