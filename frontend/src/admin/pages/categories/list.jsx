import { List, Breadcrumb, TextField, useTable, EditButton } from '@refinedev/antd';
import { usePermissions } from '@refinedev/core';
import { Table, Space } from 'antd';

export const CategoryList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'categories' });

  return (
    <List title="Here's a category manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'medium' }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="#Id"
          render={(value) => {
            return <TextField strong value={`#${value}`} />;
          }}
        />
        <Table.Column
          title="Icon"
          dataIndex="icon"
          render={(value) => {
            return <span dangerouslySetInnerHTML={{ __html: value }} />;
          }}
        />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
             <EditButton hideText size="medium" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
