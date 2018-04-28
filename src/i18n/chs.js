import baseMessage from '../ra-language-chinese';

export default {
  ...baseMessage,
  resources: {
    Department: {
      name: '部门 |||| 部门',
      fields: {
        name: '部门名',
        seq: '排序号',
        enables: '启用',
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
    }
  }
}