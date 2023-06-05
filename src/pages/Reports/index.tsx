import { detailReport } from '@/services/api/reports';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Card, Col, Row, Table, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
type Props = {};

const data = [
  { ratio: 'Annual return      ', value: 0.652557 },
  { ratio: 'Cumulative returns ', value: 0.067992 },
  { ratio: 'Annual volatility  ', value: 0.294737 },
  { ratio: 'Sharpe ratio       ', value: 1.848302 },
  { ratio: 'Calmar ratio       ', value: 6.307388 },
  { ratio: 'Stability          ', value: 0.042619 },
  { ratio: 'Max drawdown       ', value: -0.103459 },
  { ratio: 'Omega ratio        ', value: 1.405694 },
  { ratio: 'Sortino ratio      ', value: 2.927769 },
  { ratio: 'Skew               ', value: 0.228642 },
  { ratio: 'Kurtosis           ', value: 1.463689 },
  { ratio: 'Tail ratio         ', value: 0.889921 },
  { ratio: 'Daily value at risk', value: -0.034972 },
  { ratio: 'Alpha              ', value: 0.0 },
  { ratio: 'Beta               ', value: 1.0 },
];

function ReportDetail({}: Props) {
  const [data, setData] = useState();
  const [method, setMethod] = useState();
  const [startAmount, setStartAmount] = useState();
  const [endAmount, setEndAmount] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [cumulative, setCumulative] = useState<number>(0);
  const { id } = useParams();
  const columns = [
    {
      title: 'Ratio',
      dataIndex: 'ratio',
    },
    {
      title: 'Value',
      dataIndex: 'value',
    },
  ];

  const methodChose = (value) => {
    switch (value) {
      case 'ppo':
        return 'PPO Agent';
      case 'a2c':
        return 'A2C Agent';
      case 'lr':
        return 'Linear Regression Method';
      default:
        return 'PPO METHOD';
    }
  };

  const getReportDetail = async (id: any) => {
    const value = await detailReport(id);
    setStartAmount(value?.init_amount);
    const endMount = value?.init_amount + value?.init_amount * value?.cumulative_returns;
    setEndAmount(endMount);
    setFromDate(value?.start_date);
    setToDate(value?.end_date);
    setCumulative(value?.cumulative_returns);
    const metodC = methodChose(value?.task?.model);
    setMethod(metodC);
    setData([
      { ratio: 'Annual return      ', value: value?.annual_return * 100 + ' %' },
      { ratio: 'Cumulative return ', value: value?.cumulative_returns },
      { ratio: 'Sharpe ratio       ', value: value?.sharpe_ratio },
      { ratio: 'Calmar ratio       ', value: value?.calmar_ratio },
      { ratio: 'Max drawdown       ', value: value.m_drawdown },
      { ratio: 'Omega ratio        ', value: value.omega_ratio },
    ]);
  };

  useEffect(() => {
    getReportDetail(id);
  }, [id]);

  return (
    <PageContainer>
      <Card style={{ marginBottom: '10px' }}>
        <Typography.Title type="success" level={5}>
          {method}
        </Typography.Title>
        <Typography.Title level={5}>
          {moment(fromDate).format('DD-MM-YYYY')} ~ {moment(toDate).format('DD-MM-YYYY')}
        </Typography.Title>
      </Card>
      <Row gutter={16} style={{ paddingBottom: '10px' }}>
        <Col span={8}>
          <Card title="Begin asset" bordered={false}>
            Begin asset: {startAmount}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="End asset" bordered={false}>
            End asset: {endAmount}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Cumulative return" bordered={false}>
            {cumulative * 100} %
          </Card>
        </Col>
      </Row>

      <Table columns={columns} dataSource={data} />
    </PageContainer>
  );
}

export default ReportDetail;
