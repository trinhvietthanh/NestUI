import { PageContainer } from '@ant-design/pro-components';
import CandleStickChart from './components/candlestick';
import HistoryTable from './components/history-table';

const StockChartExample = () => {
  return (
    <PageContainer>
      <CandleStickChart symbol="HPG" />
      <HistoryTable />
    </PageContainer>
  );
};

export default StockChartExample;
