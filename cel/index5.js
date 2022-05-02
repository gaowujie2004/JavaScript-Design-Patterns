/**================================== 一个字段，多个校验 **/

validator.add(loginForm.userName, [
  {
    message: '密码长度至少6位',
  },
]);
