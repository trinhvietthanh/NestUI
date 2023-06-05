import { REPORT_API_ROUTER } from '@/shared/api';
import { request } from '@umijs/max';

export async function reports(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request(REPORT_API_ROUTER.GET_LIST_REPORT, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function detailReport(id: any) {
  return request(REPORT_API_ROUTER.GET_REPORT_DETAIL.replace(':id', id), {
    method: 'GET',
  });
}

export async function createReport(id: any, options?: { [key: string]: any }) {
  return request(REPORT_API_ROUTER.CREATE_REPORT.replace(':id', id), {
    method: 'POST',
    data: options,
  });
}
