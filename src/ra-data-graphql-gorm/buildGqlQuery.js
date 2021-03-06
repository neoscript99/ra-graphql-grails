import { GET_LIST, GET_MANY, GET_MANY_REFERENCE, DELETE } from 'react-admin';
import { QUERY_TYPES } from 'ra-data-graphql';
import { TypeKind } from 'graphql';

import { encodeQuery, encodeMutation } from './graphqlify';
import getFinalType from './getFinalType';
import isList from './isList';
import isRequired from './isRequired';
const rootKey = 'root____';
export const buildFields = (introspectionResults, level = 0) => fields =>
    fields.reduce((acc, field) => {
        //默认不做1对多的连接
        if (level>1 && field.type.kind === TypeKind.LIST)
            return acc;

        const type = getFinalType(field.type);

        if (type.name.startsWith('_')) {
            return acc;
        }

        if (type.kind !== TypeKind.OBJECT) {
            return { ...acc, [field.name]: {} };
        }

        //不做资源连接，通过linkedType获取完整对象
        /*
        const linkedResource = introspectionResults.resources.find(
            r => r.type.name === type.name
        );

        if (linkedResource) {
            return { ...acc, [field.name]: { fields: { id: {} } } };
        }
        */

        const linkedType = introspectionResults.types.find(
            t => t.name === type.name
        );

        //限制3层的属性嵌套，防止死循环
        if (linkedType && level <= 3) {
            return {
                ...acc,
                [field.name]: {
                    fields: buildFields(introspectionResults, level + 1)(
                        linkedType.fields
                    ),
                },
            };
        }

        // NOTE: We might have to handle linked types which are not resources but will have to be careful about
        // ending with endless circular dependencies
        return acc;
    }, {});

export const getArgType = arg => {
    const type = getFinalType(arg.type);
    const required = isRequired(arg.type);
    const list = isList(arg.type);

    return `${list ? '[' : ''}${type.name}${list ? '!]' : ''}${required
        ? '!'
        : ''}`;
};

export const buildArgs = (query, variables) => {
    if (query.args.length === 0) {
        return {};
    }

    const validVariables = Object.keys(variables).filter(
        k => typeof variables[k] !== 'undefined'
    );
    let args = query.args
        .filter(a => validVariables.includes(a.name))
        .reduce(
            (acc, arg) => ({ ...acc, [`${arg.name}`]: `$${arg.name}` }),
            {}
        );

    return args;
};

export const buildApolloArgs = (query, variables) => {
    if (query.args.length === 0) {
        return {};
    }

    const validVariables = Object.keys(variables).filter(
        k => typeof variables[k] !== 'undefined'
    );

    let args = query.args
        .filter(a => validVariables.includes(a.name))
        .reduce((acc, arg) => {
            return { ...acc, [`$${arg.name}`]: getArgType(arg) };
        }, {});

    return args;
};

export default introspectionResults => (
    resource,
    aorFetchType,
    queryType,
    variables
) => {
    const { sortField, sortOrder, ...metaVariables } = variables;
    /*graphql总的query variables定义，传入的是数据类型，如
    query departmentList($max: Int, $offset: Int, $sort: String, $order: String)
    */
    const apolloArgs = buildApolloArgs(queryType, variables);
    /*
    args和metaArgs是单个query的入参，这里是对apolloArgs的引用，如：
    items: departmentList(max: $max, offset: $offset, sort: $sort, order: $order, ignoreCase: false)
    */
    const args = buildArgs(queryType, variables);
    //const metaArgs = buildArgs(queryType, metaVariables);
    //优化graphql返回值fields获取方式： 通过queryType.type， 不再通过resource.type
    const fields = buildFields(introspectionResults)([{ name: rootKey, type: queryType.type }])[rootKey].fields;


    /*
    graphql返回值fields获取方式优化后，
    gorm的GET_LIST不需要特殊处理，返回 results, totalCount
    gorm的delete不需要特殊处理，返回success: Boolean!, error: String
    */

    const query = {
        params: apolloArgs,
        fields: {
            data: {
                field: queryType.name,
                params: args,
                fields,
            },
        },
    };

    const result = QUERY_TYPES.includes(aorFetchType)
        ? encodeQuery(queryType.name, query)
        : encodeMutation(queryType.name, query);

    return result;
};
