import { getAssetDetail } from '@/services/api/asset';
import { Image, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';

type Props = {};
interface DataType {
  key: React.Key;
  name: string;
  percent: number;
  image: string;
  symbol: string;
}
export default ({ match }: any) => {
  const { id } = useParams();

  // const { data } = useRequest(getAssetDetail, {
  //   manual: true,
  // })
  // console.log("data: ", data)
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      name: `Hòa Phát`,
      percent: 33,
      image: `https://www.hoaphat.com.vn/assets/images/logo.png`,
      symbol: 'HPG',
    },
    {
      key: '1',
      name: `Techcombank`,
      percent: 33,
      image: `https://finance.vietstock.vn/image/TCB`,
      symbol: 'TCB',
    },
    {
      key: '2',
      name: `Vinhome`,
      percent: 33,
      image: `https://finance.vietstock.vn/image/VHM`,
      symbol: 'VHM',
    },
  ]);
  const defaultColumns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
    },
    {
      title: 'Logo',
      dataIndex: 'image',
      render: (_, record) => {
        return (
          <>
            <Image src={record?.image} preview={false} height={50} width={200} />
          </>
        );
      },
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
    },
    // {
    //   title: 'Percent(%)',
    //   dataIndex: 'percent',
    //   editable: true,
    // },
  ];

  const getAssetsByID = async (id: any) => {
    const value = await getAssetDetail(id);
    setDataSource(value.companies);
  };

  useEffect(() => {
    getAssetsByID(id);
  }, [id]);

  return (
    <>
      <Table
        rowClassName={() => 'editable-row'}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={defaultColumns}
      />
    </>
  );
};
