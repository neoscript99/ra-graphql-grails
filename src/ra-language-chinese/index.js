export default {
  ra: {
    action: {
      delete: '删除',
      show: '显示',
      list: '列表',
      save: '保存',
      create: '新建',
      edit: '编辑',
      sort: '排序',
      cancel: '取消',
      undo: '撤销',
      refresh: '刷新',
      add: '新增',
      remove: '移除',
      add_filter: '新增过滤器',
      remove_filter: '移除过滤器',
      back: '返回',
      bulk_actions: '已选中%{smart_count}',
    },
    boolean: {
      true: '是',
      false: '否',
    },
    page: {
      list: '%{name}列表',
      edit: '%{name} #%{id}',
      show: '%{name} #%{id}',
      create: '新建%{name}',
      dashboard: '首页',
      not_found: '无记录',
      loading: '加载中',
    },
    input: {
      file: {
        upload_several:
          'Drop some files to upload, or click to select one.',
        upload_single: 'Drop a file to upload, or click to select it.',
      },
      image: {
        upload_several:
          'Drop some pictures to upload, or click to select one.',
        upload_single:
          'Drop a picture to upload, or click to select it.',
      },
      references: {
        all_missing: 'Unable to find references data.',
        many_missing:
          'At least one of the associated references no longer appears to be available.',
        single_missing:
          'Associated reference no longer appears to be available.',
      },
    },
    message: {
      yes: '是',
      no: '否',
      are_you_sure: '确定吗?',
      about: '关于',
      not_found:
        'Either you typed a wrong URL, or you followed a bad link.',
      loading: 'The page is loading, just a moment please',
      invalid_form: 'The form is not valid. Please check for errors',
      delete_title: 'Delete %{name} #%{id}',
      delete_content: 'Are you sure you want to delete this item?',
      bulk_delete_title:
        'Delete %{name} |||| Delete %{smart_count} %{name} items',
      bulk_delete_content:
        'Are you sure you want to delete this %{name}? |||| Are you sure you want to delete these %{smart_count} items?',
    },
    navigation: {
      no_results: '无记录',
      no_more_results:
        'The page number %{page} is out of boundaries. Try the previous page.',
      page_out_of_boundaries: 'Page number %{page} out of boundaries',
      page_out_from_end: 'Cannot go after last page',
      page_out_from_begin: 'Cannot go before page 1',
      page_range_info: '%{offsetBegin}-%{offsetEnd} of %{total}',
      next: 'Next',
      prev: 'Prev',
    },
    auth: {
      username: '用户名',
      password: '密码',
      sign_in: '登录',
      sign_in_error: '用户名或密码错误，请重试',
      logout: '退出',
    },
    notification: {
      updated: 'Element updated |||| %{smart_count} elements updated',
      created: 'Element created',
      deleted: 'Element deleted |||| %{smart_count} elements deleted',
      bad_item: 'Incorrect element',
      item_doesnt_exist: 'Element does not exist',
      http_error: 'Server communication error',
      canceled: 'Action cancelled',
    },
    validation: {
      required: '必输项',
      minLength: '至少%{min}个字符',
      maxLength: '最多%{max}个字符',
      minValue: '不能小于%{min}',
      maxValue: '不能大于%{max}',
      number: '请输入数字',
      email: '请输入正确的Email格式',
      oneOf: '输入值属于：%{options}',
      regex: '输入值需符合正则表达式: %{pattern}',
    },
  },
};
