/*
 * @Description:
 * @Autor: zhangzhanhua
 * @Date: 2021-02-19 15:43:29
 * @LastEditors: zhangzhanhua
 * @LastEditTime: 2021-02-19 18:44:49
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.app.mysql.get('blog_list', { id: 1 });
    this.ctx.body = result;
  }
  async toDoList() {
    const result =  [
      '早上开会',
      '中午吃饭',
      '晚上睡觉',
      '深夜饿人'
    ]
    this.ctx.body = result;
  }
  async Login() {
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    console.log(password);
    this.ctx.body = { msg:'登录成功',success:true,token:'xxxx' };
  }

}

module.exports = HomeController;
