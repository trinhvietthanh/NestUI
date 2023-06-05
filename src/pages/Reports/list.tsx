import { createReport, reports } from '@/services/api/reports';
import { tasks } from '@/services/api/task';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormDateRangePicker,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, Link } from '@umijs/max';
import { Button, Card, message } from 'antd';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';

type Props = {};

const data = [
  {
    key: 1,
    method: 'PPO',
    dataset: 'VN30',
    timetrade: '02/12/2022 ~ 04/05/2023',
    author: 'thanhtv',
    created_at: '12:02:01 05/05/2023',
  },
  {
    key: 2,
    method: 'A2C',
    dataset: 'VN30',
    timetrade: '02/12/2022 ~ 04/05/2023',
    author: 'thanhtv',
    created_at: '14:02:01 05/05/2023',
  },
];

const ListReport = (props: Props) => {
  const disabledDateValidator = (_, value) => {
    const endDate = value && value[1];
    return endDate && moment(endDate).isAfter(moment().endOf('day'));
  };

  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const handleAdd = async (fields: any) => {
    const hide = message.loading('Waiting');
    try {
      await createReport(fields.taskID, { ...fields });
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  const [listTask, setListTask] = useState([]);
  const getListTask = async () => {
    const value = await tasks(1, 10);
    setListTask(value.data);
  };

  useEffect(() => {
    getListTask();
  }, []);

  const columns = [
    {
      title: 'Method',
      dataIndex: 'method',
      render: (_, entity) => {
        return <>{entity?.task?.model}</>;
      },
    },
    {
      title: 'Dataset',
      dataIndex: 'dataset',
      render: (_, entity) => {
        return <>{entity?.indexList?.name}</>;
      },
    },
    {
      title: 'Trade time',
      dataIndex: 'timetrade',
      render: (_, entity) => {
        return (
          <>
            {moment(entity.start_date).format('DD/MM/YYYY')} ~{' '}
            {moment(entity.end_date).format('DD/MM/YYYY')}
          </>
        );
      },
    },
    // {
    //   title: "Author",
    //   dataIndex: "author"
    // },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: 'Options',
      render: (_, entity) => {
        return (
          <Link to={'/report/detail/' + entity.id}>
            <Button type="primary">Detail</Button>
          </Link>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <Card>
        <ProTable
          search={false}
          actionRef={actionRef}
          rowKey="key"
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
          columns={columns}
          request={reports}
        />
      </Card>

      <ModalForm
        title="Create report"
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
        <ProFormSelect
          label="Task"
          name="taskID"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue="1"
          width="md"
          options={listTask.map((value) => ({ label: value.name, value: value.id }))}
        />
        <ProFormDateRangePicker
          rules={[
            {
              required: true,
            },
          ]}
          name="tradeDate"
          label="Trade Time"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default ListReport;
