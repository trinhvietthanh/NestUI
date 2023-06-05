import { assets } from '@/services/api/asset';
import { createTask, stepForm } from '@/services/api/task';
import {
  PageContainer,
  ProCard,
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, message, Table, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { history } from 'umi';

const data = [
  { symbol: 'HPG', per: 6.603 },
  { symbol: 'VHM', per: 5.4614 },
  { symbol: 'TCB', per: 6.5444 },
  { symbol: 'NVL', per: 1.4549 },
  { symbol: 'STB', per: 4.8136 },
  { symbol: 'VND', per: 2.2509 },
  { symbol: 'MBB', per: 4.4894 },
  { symbol: 'HDB', per: 3.3015 },
  { symbol: 'FPT', per: 7.3754 },
  { symbol: 'MWG', per: 4.3021 },
  { symbol: 'VCB', per: 4.5432 },
  { symbol: 'TPB', per: 2.1345 },
  { symbol: 'ACB', per: 6.9437 },
  { symbol: 'CTG', per: 2.0563 },
  { symbol: 'PDR', per: 0.3918 },
  { symbol: 'PLX', per: 0.4657 },
  { symbol: 'GVR', per: 0.2409 },
  { symbol: 'VIB', per: 2.1179 },
  { symbol: 'VIC', per: 5.0118 },
  { symbol: 'POW', per: 0.7474 },
  { symbol: 'BCM', per: 0.3266 },
  { symbol: 'BVH', per: 0.3468 },
  { symbol: 'BID', per: 0.892 },
  { symbol: 'GAS', per: 0.9105 },
  { symbol: 'VRE', per: 2.5293 },
  { symbol: 'SAB', per: 1.1996 },
  { symbol: 'VJC', per: 2.6335 },
  { symbol: 'VNM', per: 5.9118 },
  { symbol: 'MSN', per: 4.8821 },
  { symbol: 'VPB', per: 9.1164 },
];

export default () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<ProFormInstance>();
  const [idTask, setTaskID] = useState(1);
  const [assetList, setAssets] = useState([]);
  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
    },
    {
      title: 'Percentage (%)',
      dataIndex: 'per',
    },
  ];

  const getAssets = async () => {
    const value = await assets(1, 10);
    setAssets(value.data);
  };

  useEffect(() => {
    getAssets();
  }, []);

  return (
    <PageContainer>
      <ProCard>
        <StepsForm
          formRef={formRef}
          onFinish={async () => {
            try {
              setLoading(true);
              await stepForm(idTask, formRef.current?.getFieldsValue());
              message.success('Success');
              history.push('/list-task');
            } catch (error) {
              console.log(error);
              message.error('Task run failed');
            }

            setLoading(false);
          }}
          submitter={{
            render: ({ onSubmit, step, onPre }) => {
              return [
                step > 0 && (
                  <Button
                    key="pre"
                    onClick={() => {
                      onPre?.();
                    }}
                  >
                    Previous
                  </Button>
                ),
                <Button
                  key="next"
                  loading={loading}
                  type="primary"
                  onClick={() => {
                    onSubmit?.();
                  }}
                >
                  Next
                </Button>,
              ];
            },
          }}
          formProps={{
            validateMessages: {
              required: 'Validate',
            },
          }}
        >
          <StepsForm.StepForm
            name="base"
            title="Create Input"
            onFinish={async () => {
              setLoading(true);
              const value = await createTask(formRef.current?.getFieldsValue());
              setTaskID(value.id);

              setLoading(false);
              return true;
            }}
          >
            <ProFormText
              name="name"
              label="Name"
              width="md"
              placeholder="Model ai name"
              rules={[{ required: true }]}
            />
            <ProFormSelect
              label="Asset type"
              name="assets"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue="1"
              width="md"
              options={assetList.map((value) => ({ label: value.name, value: value.id }))}
            />

            <ProFormDateRangePicker name="datetime" label="Training Time" />
            <ProFormTextArea name="desc" label="Descripition" width="lg" />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="checkbox" title="Crawl data">
            <Typography.Title level={3}>Investment Portfolio Init</Typography.Title>
            <Table columns={columns} dataSource={data} />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="time" title="Chose model">
            <ProFormSelect
              label="Model AI"
              name="modelType"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue="1"
              width="md"
              options={[
                {
                  value: 'ppo',
                  label: 'PPO',
                },
                { value: 'a2c', label: 'A2C' },
                {
                  value: 'lr',
                  label: 'Linear Regression',
                },
                {
                  value: 'svm',
                  label: 'SVM',
                },
              ]}
            />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </PageContainer>
  );
};
