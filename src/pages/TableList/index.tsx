import { removeRule, updateRule } from '@/services/ant-design-pro/api';
import { addCompany, companies } from '@/services/api/company';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Image, message, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: any) => {
  const hide = message.loading('Waiting');
  try {
    await addCompany({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Company',
      dataIndex: 'name',
      search: false,

      valueType: 'textarea',
    },
    {
      title: 'Open',
      dataIndex: 'open',
      sorter: true,
      hideInForm: true,
      search: false,
      valueType: 'digit',
    },
    {
      title: 'Close',
      dataIndex: 'close',
      sorter: true,
      hideInForm: true,
      search: false,

      valueType: 'digit',
    },
    {
      title: 'High',
      dataIndex: 'high',
      hideInForm: true,
      search: false,

      valueType: 'digit',
    },
    {
      title: 'Low',
      sorter: true,
      dataIndex: 'low',
      hideInForm: true,
      search: false,

      valueType: 'digit',
    },
    {
      title: 'Volume',
      dataIndex: 'volume_in_day',
      sorter: true,
      hideInForm: true,
      search: false,

      valueType: 'digit',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      sorter: true,
      search: false,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={companies}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.market.modal',
          defaultMessage: 'Add Stock',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.market" defaultMessage="Company is required" />,
            },
          ]}
          label="Company Name"
          width="md"
          name="name"
        />
        <ProFormText
          label="Symbol"
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.market" defaultMessage="Company is required" />,
            },
          ]}
          width="md"
          name="symbol"
        />
        <ProFormTextArea label="Description" width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        <div>
          <Image src={currentRow?.image} preview={false} width={100} />
        </div>
        <Typography.Paragraph>{currentRow?.desc}</Typography.Paragraph>
        <Typography.Title level={2} type="success">
          24.000
        </Typography.Title>

        <ProDescriptions column={2} title="Thông tin cơ bản">
          <ProDescriptions.Item valueType="option">
            <Button key="primary" type="primary">
              Chi tiết
            </Button>
            <Button key="primary" type="primary">
              Lịch sử giá
            </Button>
          </ProDescriptions.Item>

          <ProDescriptions.Item label="Mã cổ phiếu">MBB</ProDescriptions.Item>
          <ProDescriptions.Item label="Vốn hóa" valueType="digit">
            82 065.15
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Mở cửa">18,200</ProDescriptions.Item>
          <ProDescriptions.Item label="Đóng cửa">18,100</ProDescriptions.Item>
          <ProDescriptions.Item label="Giá cao nhât">18,250</ProDescriptions.Item>
          <ProDescriptions.Item label="Giá thấp nhât">18,100</ProDescriptions.Item>

          {/* <ProDescriptions.Item label="日期时间" valueType="dateTime">
        {dayjs().valueOf()}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="日期" valueType="date">
        {dayjs().valueOf()}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="日期区间" valueType="dateTimeRange">
        {[dayjs().add(-1, 'd').valueOf(), dayjs().valueOf()]}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="时间" valueType="time">
        {dayjs().valueOf()}
      </ProDescriptions.Item> */}
        </ProDescriptions>
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
