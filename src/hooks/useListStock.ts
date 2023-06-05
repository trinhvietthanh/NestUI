import { companies } from '@/services/api/company';
import { useCallback, useState } from 'react';
function useStockList(filter) {
  const [data, setData] = useState();
  const [totalStocks, setTotalStock] = useState();
  const [loading, setLoading] = useState(true);

  const getListStocks = useCallback(async (filter) => {
    let { page } = filter;

    const response = companies();
  });
}
