import buildGraphqlDataProvider from './ra-data-graphql-gorm';
import buildApolloClient from 'ra-data-graphql/lib/buildApolloClient'
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'react-admin';

import { decapitalize } from 'underscore.string'

function decapAndAppend(type, append) {
  const decapName = decapitalize(type.name)
  return append ? decapName + append : decapName;
}
/*
resource对应的graphql查询方法名，
如果graphql的type包含对应的`${type.name}List`和`${type.name}`两个查询，认定为一个resource，并和<Admin>中的resource对应

参考：ra-data-graphql/src/introspection.js
*/
const introspection = {
  operationNames: {
    [GET_LIST]: type => decapAndAppend(type, 'List'),
    [GET_ONE]: type => decapAndAppend(type),
    [GET_MANY]: type => decapAndAppend(type, 'List'),
    [GET_MANY_REFERENCE]: type => decapAndAppend(type, 'List'),
    [CREATE]: type => decapAndAppend(type, 'Create'),
    [UPDATE]: type => decapAndAppend(type, 'Update'),
    [DELETE]: type => decapAndAppend(type, 'Delete'),
  },
  exclude: undefined,
  include: undefined,
};

export default () => buildGraphqlDataProvider({
  client: buildApolloClient({ uri: '/graphql' }), introspection
});