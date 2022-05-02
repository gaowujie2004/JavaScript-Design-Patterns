/**================================== 一个字段，多个校验 **/

validator.add(loginForm.userName, [
  {
    strategy: 'isNotEmpty',
    message: '不能为空',
  },
  {
    strategy: 'minLength:6',
    message: '用户名长度至少6位',
  },
]);
