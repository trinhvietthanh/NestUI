import { tasks } from '@/services/api/task';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable, useIntl } from '@ant-design/pro-components';
import { useRef } from 'react';

type Props = {};

const ListTasks = (props: Props) => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: 'Task',
      dataIndex: 'name',
    },
    {
      title: 'Asset',
      dataIndex: 'assets',
    },
    {
      title: 'Process',
      dataIndex: 'step',
    },
    {
      title: 'Model',
      dataIndex: 'model',
    },
    // {
    //   title: "Author",
    //   dataIndex: "author"
    // },
    {
      title: 'Finished at',
      dataIndex: 'finished_at',
      valueType: 'dateTime',
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
        rowKey="key"
        columns={columns}
        actionRef={actionRef}
        request={tasks}
        search={false}
      />
    </PageContainer>
  );
};

export default ListTasks;
