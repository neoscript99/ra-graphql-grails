
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_ERROR } from 'react-admin';
import { apolloClient } from './dataProvider'
import gql from 'graphql-tag';
import jsSHA from 'jssha'
function login(params) {
  const { username, password } = params;
  const shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.update(password);

  return apolloClient.query({
    query: gql`
    query login {
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
  return apolloClient.query({
    query: gql`
    query login {
      logout(token:"${token}"){
        success
        error
      }
    }
  `,
  })
}
export default (type, params) => {
  switch (type) {
    case AUTH_LOGIN:
      return login(params);
    case AUTH_LOGOUT:
      const token = localStorage.getItem('role')
      //logout(token)
      localStorage.removeItem('token');
      return Promise.resolve();
    case AUTH_CHECK:
      return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    case AUTH_GET_PERMISSIONS:
      const role = localStorage.getItem('role');
      return role ? Promise.resolve(role) : Promise.reject();
    default:
      return Promise.reject('Unkown method');
  }
}