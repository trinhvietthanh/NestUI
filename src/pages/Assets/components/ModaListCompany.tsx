import { Modal, Table } from 'antd';
import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  onCancel: any;
};

const data = [
  {
    symbol: 'HPG',
    name: 'Hoà Phát',
    industry: 'Sản xuất vật liệu xây dựng',
  },
  {
    symbol: 'TCB',
    name: 'Techcombank',
    industry: 'Ngân hàng',
  },
  {
    symbol: 'MBB',
    name: 'MBBank',
    industry: 'Ngân hàng',
  },
  {
    symbol: 'VHM',
    name: 'Vinhome',
    industry: 'Bất động sản',
  },
  {
    symbol: 'VNM',
    name: 'Vinamilk',
    industry: 'Sản xuất sữa',
  },
];

const ModaListCompany = (props: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Modal title="List stock release" open={props.isOpen} onCancel={props.onCancel}>
      <Table rowSelection={rowSelection} columns={columns} pagination={false} dataSource={data} />
    </Modal>
  );
};

export default ModaListCompany;
