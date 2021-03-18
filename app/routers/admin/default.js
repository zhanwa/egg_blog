/*
 * @Description:
 * @Autor: zhangzhanhua
 * @Date: 2021-02-19 16:47:32
 * @LastEditors: zhangzhanhua
 * @LastEditTime: 2021-02-19 16:49:28
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/admin/index', controller.admin.default.index);
    router.get('/admin/todolist', controller.admin.default.toDoList);
    router.post('/admin/login', controller.admin.default.Login);//登录
  };

