/*
 * @Description:
 * @Autor: zhangzhanhua
 * @Date: 2021-02-19 15:43:29
 * @LastEditors: zhangzhanhua
 * @LastEditTime: 2021-08-16 14:53:25
 */
'use strict';
const  fs = require('fs')
const path = require('path')
const querystring =require('querystring');
const sendToWormhole = require('stream-wormhole');
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
            // password: {
            //     type: 'string',
            //     // allowEmpty: true, // 设置密码为空，作为示例乱写一下。。
            // },
            password: 'string',
            passwordCommit: 'string'
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
            data: this.ctx.request.body
        };
    }
    //上传文件
    async postFile() {
        const {
            ctx
        } = this;
        console.log(ctx.query);
        console.log(ctx.request.body);
        let stream = await ctx.getFileStream()
        let filename = new Date().getTime() + stream.filename // stream对象也包含了文件名，大小等基本信息
        console.log(stream);
        // 创建文件写入路径
        let target = path.join('./', `uploadfile/${filename}`)

        const result = await new Promise((resolve, reject) => {
            // 创建文件写入流
            const remoteFileStrem = fs.createWriteStream(target)
            // 以管道方式写入流
            stream.pipe(remoteFileStrem)

            let errFlag
            // 监听error事件
            remoteFileStrem.on('error', err => {
                errFlag = true
                // 停止写入
                sendToWormhole(stream)
                remoteFileStrem.destroy()
                console.log(err)
                reject(err)
            })

            // 监听写入完成事件
            remoteFileStrem.on('finish', () => {
                if (errFlag) return
                resolve({
                    filename,
                    name: stream.fields.name
                })
            })
        })

        ctx.body = {
            code: 200,
            message: '上传成功',
            data: result
        }
    }

}

module.exports = HomeController;