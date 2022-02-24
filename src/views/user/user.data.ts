// import { isuserExist } from '/@/api/demo/system';
// import { Switch } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { h } from 'vue';
// import { useMessage } from '/@/hooks/web/useMessage';
// import { setUserStatus } from '/@/api/sys/user';
export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'loginName',
    width: 120,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    width: 120,
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   width: 120,
  //   customRender: ({ record }: any) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false;
  //     }
  //     return h(Switch, {
  //       checked: record.status === 0,
  //       checkedChildren: '已启用',
  //       unCheckedChildren: '已禁用',
  //       loading: record.pendingStatus,
  //       onChange(checked: boolean) {
  //         record.pendingStatus = true;
  //         const { createMessage } = useMessage();
  //         setUserStatus(record.id, checked)
  //           .then((res) => {
  //             record.status = res.status;
  //             createMessage.success(`已成功修改用户状态`);
  //           })
  //           .catch(() => {
  //             createMessage.error('修改用户状态失败');
  //           })
  //           .finally(() => {
  //             record.pendingStatus = false;
  //           });
  //       },
  //     });
  //   },
  // },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const userFormSchema: FormSchema[] = [
  {
    field: 'loginName',
    label: '账号',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
    rules: [{ required: true }, { type: 'email', message: '邮箱格式错误！' }],
  },
];
