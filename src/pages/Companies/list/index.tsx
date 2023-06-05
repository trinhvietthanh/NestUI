import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useState } from 'react';

const CompanyList: React.FC = () => {
  const [createModalAddCompany, handleAddCompany] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const columns = [
    {
      title: 'Mã cồ phiếu',
      dataIndex: 'symbol',
    },
    {
      title: 'Tên công ty',
      dataIndex: 'name',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
    },
    {
      title: 'Tổng tài sản',
      dataIndex: 'total_assets',
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="Danh sách công ty"
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default CompanyList;
