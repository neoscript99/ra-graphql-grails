import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
} from 'react-admin';
import { TypeKind } from 'graphql';
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

//将filter转化为gorm构建DetachedCriteria的closure
//传入的filter为{ eq: { enabled: true, seq: 1 }, like: { name: "aa%" } , dept: { eq: {id: 'aa'}}}
//转化为{ eq: [["enabled", true], ["seq", 1]], like: [["name", "aa%"]], dept: { eq: [['id','aa']]} }
//暂时不支持defaultValue，因为传入的filter为{"eq.enabled":true},ra-ui-materialui的FilterForm设置初始值有问题
const toCriteria = (source) => {
    const keys = Object.keys(source);
    //判断是否嵌套属性
    if (keys.length === 0 || keys.some(key => ((typeof source[key]) === 'object')))
        return keys.reduce((acc, key) => {
            acc[key] = toCriteria(source[key]);
            return acc;
        }, {});
    else
        return keys.reduce((acc, key) => {
            acc.push([key, source[key]]);
            return acc;
        }, []);
}

const buildGetListVariables = () => (
    resource,
    aorFetchType,
    params
) => {
    const criteria = toCriteria(params.filter);

    const { pagination: { page, perPage }, sort: { field, order } } = params;
    if (perPage) {
        criteria.max = perPage;
        criteria.offset = (page > 0 ? page - 1 : 0) * perPage;
    }
    if (field)
        criteria.order = [[field, order]];

    return { criteria: JSON.stringify(criteria) };
};

const sanitizeInputObject = introspectionResults =>
    (inputTypeName, inputObject) => {
        const type = introspectionResults.types.find(
            t => t.name === inputTypeName
        );
        return type.inputFields.reduce((acc, field) => {
            acc[field.name] = (field.type.kind === TypeKind.INPUT_OBJECT) ?
                sanitizeInputObject(introspectionResults)(field.type.name, inputObject[field.name]) :
                inputObject[field.name];
            return acc;
        }, {});
    };

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
        //通过sanitizeInputObject过滤无用属性，否则服务器报错
        case UPDATE: {
            const { id, errors, ...rest } = params.data;
            return {
                id: id,
                [queryType.args[1].name]: sanitizeInputObject(introspectionResults)(queryType.args[1].type.name, rest)
            };
        }

        case CREATE: {
            return {
                [queryType.args[0].name]: sanitizeInputObject(introspectionResults)(queryType.args[0].type.name, params.data)
            };
        }

        case DELETE:
            return {
                id: params.id,
            };
    }
};
