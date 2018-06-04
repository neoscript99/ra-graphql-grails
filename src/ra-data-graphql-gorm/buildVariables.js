import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
} from 'react-admin';

import getFinalType from './getFinalType';
import isList from './isList';

const sanitizeValue = (type, value) => {
    if (type.name === 'Int') {
        return parseInt(value);
    }

    if (type.name === 'Float') {
        return parseFloat(value);
    }

    return value;
};

const buildGetListVariables = introspectionResults => (
    resource,
    aorFetchType,
    params
) => {
    //将filter转化为gorm构建DetachedCriteria的closure
    const eqs = [];
    const criteria = { eq: eqs };
    
    Object.keys(params.filter).forEach((key) => {
        eqs.push([key, params.filter[key]]);
    });

    const { pagination: { page, perPage }, sort: { field, order } } = params;
    if (perPage) {
        criteria.max = perPage;
        criteria.offset = (page > 0 ? page - 1 : 0) * perPage;
    }
    if (field)
        criteria.order = [[field, order]];

    return { criteria: JSON.stringify(criteria) };
};

const buildCreateUpdateVariables = () => (
    resource,
    aorFetchType,
    params,
    queryType
) =>
    Object.keys(params.data).reduce((acc, key) => {
        if (Array.isArray(params.data[key])) {
            const arg = queryType.args.find(a => a.name === `${key}Ids`);

            if (arg) {
                return {
                    ...acc,
                    [`${key}Ids`]: params.data[key].map(({ id }) => id),
                };
            }
        }

        if (typeof params.data[key] === 'object') {
            const arg = queryType.args.find(a => a.name === `${key}Id`);

            if (arg) {
                return {
                    ...acc,
                    [`${key}Id`]: params.data[key].id,
                };
            }
        }

        return {
            ...acc,
            [key]: params.data[key],
        };
    }, {});

export default introspectionResults => (
    resource,
    aorFetchType,
    params,
    queryType
) => {
    switch (aorFetchType) {
        case GET_LIST: {
            return buildGetListVariables(introspectionResults)(
                resource,
                aorFetchType,
                params,
                queryType
            );
        }
        case GET_MANY:
            return {
                filter: { ids: params.ids },
            };
        case GET_MANY_REFERENCE: {
            const parts = params.target.split('.');

            return {
                filter: { [parts[0]]: { id: params.id } },
            };
        }
        case GET_ONE:
            return {
                id: params.id,
            };
        //gorm-graphql的UPDATE和CREATE的入参为INPUT_OBJECT类型，不是属性集
        case UPDATE: {
            const { id, errors, ...rest } = params.data;
            return {
                id: id,
                [queryType.args[1].name]: rest
            };
        }

        case CREATE: {
            return {
                [queryType.args[0].name]: params.data
            };
        }

        case DELETE:
            return {
                id: params.id,
            };
    }
};
