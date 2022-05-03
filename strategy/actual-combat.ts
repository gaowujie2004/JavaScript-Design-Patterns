// constant.ts
const enum Status {
  Unknown = 0,
  Success = 1,
  Fail = 2,
  Check = 3,
}

/**** Strategy ****/
export const statusMap = {
  [Status.Unknown]: { text: 'ERROR', color: 'origin' },
  [Status.Success]: { text: '成功', color: 'green' },
  [Status.Check]: { text: '审核中', color: 'gray' },
  [Status.Fail]: { text: '失败', color: 'red' },
};

/**** Context ****/
export function renderStatus(status: Status) {
  return statusMap[status];
}

// 多个选择，同一个终点。
// 同一个变量 status 有多个可能，无论那种可能都是中 statusMap 中挑选一个返回出去。
