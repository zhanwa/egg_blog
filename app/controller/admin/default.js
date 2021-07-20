/*
 * @Description:
 * @Autor: zhangzhanhua
 * @Date: 2021-02-19 15:43:29
 * @LastEditors: zhangzhanhua
 * @LastEditTime: 2021-07-20 15:51:38
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const result = await this.app.mysql.get('blog_list', {
            id: 1
        });
        this.ctx.body = result;
    }

    async toDoList() {
        const result = [
            '早上开会',
            '中午吃饭',
            '晚上睡觉',
            '深夜饿人'
        ];
        this.ctx.body = result;
    }

    async Login() {
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        console.log(password);
        this.ctx.body = {
            msg: '登录成功',
            success: true,
            token: 'xxxx'
        };
    }

    async LoginTest() {
        let accNo = this.ctx.request.body.accNo;
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        let passwordCommit = this.ctx.request.body.passwordCommit;
        let sex = this.ctx.request.body.sex;
        let birthday = this.ctx.request.body.birthday;
        let region = this.ctx.request.body.region;
        let verificationCode = this.ctx.request.body.verificationCode;
        let errs = this.app.validator.validate({
            accNo: {
                type: 'string',
                allowEmpty: false // 设置密码为空，作为示例乱写一下。。
            },
            userName: 'string',
            password: {
                type: 'password',
                allowEmpty: true, // 设置密码为空，作为示例乱写一下。。
            },
            passwordCommit: 'password'
        }, this.ctx.request.body)
        if (errs) {
            this.ctx.body = {
                msg: `${errs[0].field}缺失`,
                success: false,
                token: 'xxxx'
            };
            return
        }
        this.ctx.body = {
            msg: '登录成功',
            success: true,
            token: 'xxxx',
            data:this.ctx.request.body
        };
    }

}

module.exports = HomeController;