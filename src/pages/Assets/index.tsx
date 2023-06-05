import { assets } from '@/services/api/asset';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Link, useIntl } from '@umijs/max';
import { useRef } from 'react';

const index = (props: Props) => {
  const actionRef = useRef<ActionType>();

  const intl = useIntl();

  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name"
  //   },
  //   {
  //     title: "Number of Stock",
  //     dataIndex: "numberOfStock",
  //     search: false
  //   },

  //   {
  //     title: "Author",
  //     dataIndex: "author",
  //     search: false

  //   },
  //   {
  //     title: "Created at",
  //     dataIndex: "created_at",
  //     type: "dateTime",
  //     search: false

  //   }

  // ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (dom, entity) => {
        return <Link to={'/index/' + entity.id}>{dom}</Link>;
      },
    },
    {
      title: 'Number Of stock',
      dataIndex: 'stockCount',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
  ];

  return (
    <PageContainer>
      <ProTable
        request={assets}
        search={false}
        actionRef={actionRef}
        rowKey="key"
        // toolBarRender={() => [
        //   <Button type='primary' key='create'>
        //     <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
        //   </Button>
        // ]}
        columns={columns}
      />
    </PageContainer>
  );
};

export default index;
