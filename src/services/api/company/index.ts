import { CompanyItem } from '@/interfaces/company';
import { COMPANY_API_ROUTER } from '@/shared/api';
import { request } from '@umijs/max';

export async function companies(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ data: CompanyItem[]; total?: number; success: boolean }>(
    COMPANY_API_ROUTER.GET_LIST_COMPANY,
    {
      method: 'GET',
      skipErrorHandler: true,
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

export async function addCompany(options?: { [key: string]: any }) {
  return request(COMPANY_API_ROUTER.CREATE_COMPANY, {
    method: 'POST',
    data: options,
  });
}

export async function chartDay(params: { symbol: string }) {
  return request(COMPANY_API_ROUTER.HISTORY_PRICE, {
    method: 'GET',
    params: { ...params },
  });
}
