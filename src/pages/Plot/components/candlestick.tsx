import { chartDay } from '@/services/api/company';
import { Stock } from '@ant-design/charts';
import { notification } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface IData {
  TradingDate: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
}

const CandleStickChart = ({ symbol }: { symbol: string }) => {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await chartDay({ symbol: symbol });
        setData(value);
      } catch (error) {
        notification.error({
          message: `Response Error`,
          description: `Can't get user info`,
        });
      }
    };
    fetchData();
  }, []);

  // Filter out undefined data points
  const filteredData = data.filter((item) => {
    return (
      item.TradingDate !== undefined &&
      item.Open !== undefined &&
      item.High !== undefined &&
      item.Low !== undefined &&
      item.Close !== undefined &&
      item.Volume !== undefined
    );
  });

  const config = {
    data: filteredData,
    xField: 'TradingDate',
    yField: ['Open', 'Close', 'High', 'Low'],
    meta: {
      TradingDate: {
        type: 'time',
        mask: 'YYYY-MM-DD',
      },
    },

    tooltip: {
      showMarkers: false,
      customContent: (title: string, items: any[]) => {
        const item = items[0];
        if (!item || !item.data) {
          return null;
        }
        const { Open, Close, High, Low } = item.data;
        const html = `
          <div style="padding: 10px;">
            <div style="margin-bottom: 5px;">Trading Date: ${moment(item.data.TradingDate).format(
              'DD/MM/YYYY',
            )}</div>
            <div>Open: ${Open}</div>
            <div>Close: ${Close}</div>
            <div>High: ${High}</div>
            <div>Low: ${Low}</div>
          </div>
        `;
        return html;
      },
    },
    legend: false,
  };

  return <Stock {...config} />;
};

export default CandleStickChart;
