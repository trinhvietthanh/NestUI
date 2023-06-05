import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, InputRef, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ModaListCompany from './components/ModaListCompany';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  percent: number;
  image: string;
  symbol: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
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

  const [count, setCount] = useState(2);
  const [isOpenListStock, setOpenListStock] = useState(false);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
    },
    {
      title: 'Logo',
      dataIndex: 'image',
      render: (_, record) => {
        return <Image src={record?.image} preview={false} width={200} />;
      },
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: 'Percent(%)',
      dataIndex: 'percent',
      editable: true,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `Hòa Phát`,
      percent: 32,
      image: `https://www.hoaphat.com.vn/assets/images/logo.png`,
      symbol: 'HPG',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const showModalListStock = () => {
    setOpenListStock(true);
  };

  const handleCancel = () => {
    setOpenListStock(false);
  };

  return (
    <div>
      <Form>
        <Form.Item label="Asset">
          <Input />
        </Form.Item>
      </Form>
      <Button
        onClick={showModalListStock}
        type="primary"
        style={{ marginBottom: 16, float: 'right' }}
      >
        <PlusOutlined /> Add stock
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      <Button onClick={showModalListStock} type="primary" style={{ marginTop: 16 }}>
        <PlusOutlined /> Create Asset
      </Button>
      <ModaListCompany onCancel={handleCancel} isOpen={isOpenListStock} />
    </div>
  );
};

export default App;
