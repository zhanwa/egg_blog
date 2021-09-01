/*
 * @Description:
 * @Autor: zhangzhanhua
 * @Date: 2021-02-19 16:47:32
 * @LastEditors: zhangzhanhua
 * @LastEditTime: 2021-08-16 14:24:43
 */
module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.get('/admin/index', controller.admin.default.index);
    router.get('/admin/todolist', controller.admin.default.toDoList);
    router.post('/admin/loginTest', controller.admin.default.LoginTest); //登录
    router.post('/admin/login', controller.admin.default.Login); //登录
    router.post('/admin/postFile', controller.admin.default.postFile); //上传文件

    //todolist
     router.get('/toDoList/getTodoList', controller.admin.toDoList.getTodoList);//查询
     router.post('/toDoList/addTodoList', controller.admin.toDoList.addTodoList);//新增
     router.delete('/toDoList/delTodoList', controller.admin.toDoList.delTodoList);//delTodoList
     router.put('/toDoList/putTodoList', controller.admin.toDoList.putTodoList);//putTodoList
     router.put('/toDoList/changeTodoList', controller.admin.toDoList.changeTodoList);//changeTodoList
};