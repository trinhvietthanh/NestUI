import { ASSET_API_ROUTER } from '@/shared/api';
import { request } from '@umijs/max';

export async function assets(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request(ASSET_API_ROUTER.GET_LIST_ASSETS, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addAsset(data?: { [key: string]: any }) {
  return request(ASSET_API_ROUTER.CREATE_ASSET, {
    method: 'POST',
    data: data,
  });
}

export async function getAssetDetail(id: any) {
  return request(ASSET_API_ROUTER.GET_DETAIL.replace(':id', id), {
    method: 'GET',
  });
}
