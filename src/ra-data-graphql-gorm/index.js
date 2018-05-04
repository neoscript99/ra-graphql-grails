import merge from 'lodash/merge';
import buildDataProvider from 'ra-data-graphql';
import { decapitalize } from 'underscore.string'
import buildQuery from './buildQuery';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';


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
const defaultOptions = {
    buildQuery, introspection
};

export default options => {
    return buildDataProvider(
        merge({}, defaultOptions, options)
    ).then(defaultDataProvider => {
        return (fetchType, resource, params) => {
            // This provider does not support multiple deletions so instead we send multiple DELETE requests
            // This can be optimized using the apollo-link-batch-http link
            if (fetchType === DELETE_MANY) {
                const { ids, ...otherParams } = params;
                return Promise.all(
                    params.ids.map(id =>
                        defaultDataProvider(DELETE, resource, {
                            id,
                            ...otherParams,
                        })
                    )
                ).then(results => {
                    const data = results.reduce(
                        (acc, { data }) => [...acc, data.id],
                        []
                    );

                    return { data };
                });
            }
            // This provider does not support multiple deletions so instead we send multiple UPDATE requests
            // This can be optimized using the apollo-link-batch-http link
            if (fetchType === UPDATE_MANY) {
                const { ids, ...otherParams } = params;
                return Promise.all(
                    params.ids.map(id =>
                        defaultDataProvider(UPDATE, resource, {
                            id,
                            ...otherParams,
                        })
                    )
                ).then(results => {
                    const data = results.reduce(
                        (acc, { data }) => [...acc, data.id],
                        []
                    );

                    return { data };
                });
            }
            //gorm暂不支持GET_MANY {filter: { ids: params.ids }}
            if (fetchType === GET_MANY)
                return Promise.all(
                    params.ids.map(id => defaultDataProvider(GET_ONE, resource, { id }))
                ).then(values => {
                    return { data: values.map(v => v.data) }
                })
                
            return defaultDataProvider(fetchType, resource, params);
        };
    });
};
