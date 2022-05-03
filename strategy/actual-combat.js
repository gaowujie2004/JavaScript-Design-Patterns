/**================================== 实战 **/

// 多个选择，同一个终点。

// 状态 —— className
// 同一个变量 status 有多个可能，无论那种可能都是中 statusMap 中挑选一个返回出去。
const statusMap = {
  [0]: {
    text: 'ERROR',
    color: 'error',
  },

  [1]: {
    text: '成功',
    color: 'success',
  },

  [2]: {
    text: '失败',
    color: 'red',
  },
};

function renderStatus(status) {
  // status: number
  return statusMap[status];
}
