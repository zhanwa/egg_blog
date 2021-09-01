/*
 * @Description: 
 * @Autor: zhangzhanhua
 * @Date: 2021-07-20 15:54:04
 * @LastEditors: zhangzhanhua
 * @LastEditTime: 2021-08-13 14:29:25
 */
'use strict';

const Controller = require('egg').Controller;
let data = [{
        id: 1,
        name: '完成', //任务名称
        status: 1 //是否完成 1完成
    },
    {
        id: createUUID(),
        name: '未完成', //任务名称
        status: 0 //是否完成 0未完成
    }
]
class HomeController extends Controller {

    async getTodoList() {
        const result = {
            data: data,
            success: true,
            msg: '查询成功'
        }
        if (this.ctx.query.status) {
            result.data = data.filter(res => res.status == this.ctx.query.status)
        }
        this.ctx.set('Cache-Control', 'max-age=60');
        this.ctx.body = result;
    }
    async addTodoList() {
        let name = this.ctx.request.body.name;
        let errs = this.app.validator.validate({
            name: {
                type: 'string',
                allowEmpty: false // 设置密码为空，作为示例乱写一下。。
            },
        }, this.ctx.request.body)
        if (errs) {
            this.ctx.body = {
                msg: `${errs[0].field}缺失`,
                success: false
            };
            return
        }
        data.push({
            id: createUUID(),
            name: name, //任务名称
            status: 0 //是否完成 1完成
        })
        const result = {
            data: data,
            success: true,
            msg: '新增成功'
        }
        this.ctx.body = result;
    }
    async delTodoList() {
        const result = {
            data: data,
            success: true,
            msg: '删除成功'
        }
        let delId = this.ctx.query.delId;
        let errs = this.app.validator.validate({
            delId: {
                type: 'string',
                allowEmpty: false // 设置密码为空，作为示例乱写一下。。
            },
        }, this.ctx.query)
        if (errs) {
            this.ctx.body = {
                msg: `${errs[0].field}缺失`,
                success: false
            };
            return
        }
        console.log(delId);
        const delIndex = data.findIndex(res => res.id == delId)
        if (delIndex != -1) {
            data.splice(delIndex, 1)
            this.ctx.body = result
        } else {
            this.ctx.body = {
                msg: `删除失败`,
                success: false
            };
        }
    }
    async putTodoList() {
        let name = this.ctx.request.body.name;
        let putId = this.ctx.request.body.putId;
        let errs = this.app.validator.validate({
            name: {
                type: 'string',
                allowEmpty: false // 设置密码为空，作为示例乱写一下。。
            },
            putId: 'string'
        }, this.ctx.request.body)
        if (errs) {
            this.ctx.body = {
                msg: `${errs[0].field}缺失`,
                success: false
            };
            return
        }
        const putIndex = data.findIndex(res => res.id == putId)
        console.log(putIndex);
        if (putIndex == -1) {
            this.ctx.body = {
                msg: `修改失败`,
                success: false
            };
            return
        }
        data.map(res => {
            if (res.id == putId) {
                res.name = name
            }
        })
        const result = {
            data: data,
            success: true,
            msg: '修改成功'
        }
        this.ctx.body = result;
    }
    async changeTodoList() {
        let changeId = this.ctx.request.body.changeId;
        let errs = this.app.validator.validate({
            changeId: 'string'
        }, this.ctx.request.body)
        if (errs) {
            this.ctx.body = {
                msg: `${errs[0].field}缺失`,
                success: false
            };
            return
        }
        try {
            const changeIndex = data.findIndex(res => res.id == changeId)
            if (changeIndex == -1) {
                this.ctx.body = {
                    msg: `修改失败`,
                    success: false
                };
                return
            }
            data.map(res => {
                if (res.id == changeId) {
                    res.status == 0 ? res.status = 1 : res.status = 0
                }
            })
            const result = {
                data: data,
                success: true,
                msg: '修改成功'
            }
            this.ctx.body = result;
        } catch {
            this.ctx.body = {
                msg: `修改失败`,
                success: false
            };
        }
    }

}

function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
module.exports = HomeController;