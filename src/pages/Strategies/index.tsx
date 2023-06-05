import { PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button } from 'antd';
import { useRef } from 'react';

type Props = {};

const StategiesList = (props: Props) => {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Mô hình sử dụng',
      dataIndex: 'model',
    },
    {
      title: 'Loại tài sản',
      dataIndex: 'assetType',
    },
    {
      title: 'Tỷ lệ lợi nhuận hàng năm',
      dataIndex: 'annualizedReturn',
    },
    {
      title: 'Option',
      render: () => {
        return (
          <>
            <Button>Chi tiết</Button>
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        // headerTitle={intl.formatMessage({
        //   id: 'pages.searchTable.title',
        //   defaultMessage: 'Enquiry form',
        // })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            // onClick={() => {
            //   handleModalOpen(true);
            // }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        // request={companies}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
    </PageContainer>
  );
};

export default StategiesList;
