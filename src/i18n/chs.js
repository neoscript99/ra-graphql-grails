import baseMessage from '../ra-language-chinese';

export default {
  ...baseMessage,
  resources: {
    Department: {
      name: '部门 |||| 部门',
      fields: {
        name: '部门名',
        seq: '排序号',
        enabled: '启用',
      },
      tabs: {
        identity: 'Identity',
        address: 'Address',
        orders: 'Orders',
        reviews: 'Reviews',
        stats: 'Stats',
      },
      page: {
        delete: 'Delete Customer',
      },
    },
    User: {
      name: '用户 |||| 用户',
      fields: {
        account:'账号',
        name: '名称',
        editable: '可编辑',
        enabled: '启用',
        "dept.id": '所属部门',
        "dept.name": '所属部门',
      },
    }
  }
}