import { TASK_API_ROUTER } from '@/shared/api';
import { request } from '@umijs/max';
export async function tasks(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request(TASK_API_ROUTER.GET_LIST_TASKS, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createTask(options: { [key: string]: any }) {
  // options.start_time_train = moment(options?.datetime[0]).format("YYYY-MM-DD");
  options.step = 'crawlData';
  options.is_trained = true;
  options.author = 1;
  return request(TASK_API_ROUTER.CREATE_TASK, {
    method: 'POST',
    data: options,
  });
}

export async function stepForm(id: any, params: any) {
  params.step = 'runAI';
  return request(TASK_API_ROUTER.UPDATE_TASK.replace(':id', id), {
    method: 'PUT',
    data: params,
  });
}
