/*
 * @Description:
 * @Autor: zhangzhanhua
 * @Date: 2021-02-19 15:43:29
 * @LastEditors: zhangzhanhua
 * @LastEditTime: 2021-02-19 16:51:30
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //主路径下的路由
  router.get('/', controller.home.index);
  router.get('/list', controller.home.list);

  //配置wx接口配置信息
  router.get('/wxapicheck', controller.home.wxApiCheck);
  // 获取签名
  router.get('/getsign', controller.home.getSign);

  //分发出来admin路径下的路由
  require('./routers/admin/default')(app)
};
