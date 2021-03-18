/*
 * @Description:
 * @Autor: zhangzhanhua
 * @Date: 2021-02-19 15:43:29
 * @LastEditors: zhangzhanhua
 * @LastEditTime: 2021-02-19 16:14:23
 */
'use strict';
const sha1 = require('sha1');
const Controller = require('egg').Controller;
const axios = require('axios')
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // console.log(decodeURIComponent(ctx.request.query.url))
console.log(ctx.req)
    ctx.body = createNoneStr()+':'+createTimeStamp();
  };

  async list() {
    const { ctx } = this;
    ctx.body = '<h1>jspang blog list</h1>';
  }


  async wxApiCheck() {
    const { ctx } = this;
    console.log(ctx.request.query);
    const { signature, timestamp, nonce, echostr } = ctx.request.query; //接收到wx传来的参数
    const token = 'wxapicheck';
    //将参数组成数组
    const tmpArray = [ timestamp, nonce, token ];
    //排序
    tmpArray.sort();
    //转为字符串并进行sha1加密
    const tmpStr = sha1(tmpArray.join(''));

    if (tmpStr === signature) {
      ctx.body = echostr;
    } else {
      ctx.body = 'error';
    }
  }

  async getSign() {
    const { ctx } = this;
    getToken()
    ctx.body = '<h1>jspang blog list</h1>';
  }
}
let getToken = ()=>{
  axios.get(` https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxde48588a00732009&secret=120070d94c9f6790f1f0d4191d473df3`).then(res=>{
    console.log(res)
    //获取ticket
    axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${res.data.access_token}&type=jsapi`).then(res=>{
      console.log(res.data)
    })
  })
}
//生成随机字符串
let createNoneStr = ()=>{
  let noneStr = Math.random().toString(36).substring(2,15) //toString的参数为多少进制转换,默认10进制
  return noneStr
}

//生成11位数时间戳
let createTimeStamp = ()=>{
  return parseInt(new Date().getTime()/1000) +''
}
module.exports = HomeController;
