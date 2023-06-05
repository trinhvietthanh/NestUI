import { DataView } from '@antv/data-set';
import { Candle, Chart, Legend, Line, Tooltip } from 'bizcharts';

const StockChart = () => {
  const data = [
    {
      date: '2022-01-01',
      start: 29050.0,
      highest: 29200.0,
      lowest: 28450.0,
      end: 28700.0,
      volume: 3438755,
    },
    // add more data points here
  ];

  const dv = new DataView().source(data);
  dv.transform({
    type: 'map',
    callback(row: any) {
      row.trend = row.start <= row.end ? '上涨' : '下跌';
      row.range = [row.start, row.end, row.highest, row.lowest];
      return row;
    },
  });

  return (
    <Chart data={dv.rows} height={400} autoFit>
      <Line position="date*volume" color="trend" />
      <Candle
        position="date*range"
        color={['trend', (val) => (val === '上涨' ? '#f04864' : '#2fc25b')]}
      />
      <Tooltip showTitle={false} />
      <Legend position="top" />
    </Chart>
  );
};

export default StockChart;
