<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增用户</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '授权',
              tooltip: '用户绑定角色',
              onClick: handleAuthorize.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              tooltip: '删除此用户',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="handleSuccess" />
    <AuthorizeModal @register="registerAuthorize" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { PageWrapper } from '/@/components/Page';

  import { useModal } from '/@/components/Modal';
  import UserModal from './UserModal.vue';

  import { columns, searchFormSchema } from './user.data';
  import { getUserList, userDelete } from '/@/api/user/user';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'UserManagement',
    components: { BasicTable, PageWrapper, UserModal, TableAction },
    setup() {
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerAuthorize, { openModal: openModalAuthorize }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '用户列表',
        api: getUserList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        // handleSearchInfoFn(info) {
        //   console.log('handleSearchInfoFn', info);
        //   return info;
        // },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      function handleAuthorize(record: Recordable) {
        openModalAuthorize(true, {
          record,
        });
      }

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        userDelete({ userId: record.id })
          .then(() => {
            createMessage.success('用户删除成功！');
            handleSuccess({ isUpdate: false, values: null });
          })
          .catch(() => {
            createMessage.error('用户删除失败！');
          });
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      return {
        registerTable,
        registerModal,
        registerAuthorize,
        handleCreate,
        handleEdit,
        handleAuthorize,
        handleDelete,
        handleSuccess,
        handleSelect,
        searchInfo,
      };
    },
  });
</script>
