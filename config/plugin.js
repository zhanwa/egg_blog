/*
 * @Description:
 * @Autor: zhangzhanhua
 * @Date: 2021-02-19 15:43:29
 * @LastEditors: zhangzhanhua
 * @LastEditTime: 2021-07-05 09:49:54
 */
'use strict';
/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    mysql: {
        enable: true,
        package: 'egg-mysql',
    },
    cors: {
        enable: true,
        // enable: false,
        package: 'egg-cors',
    },
    validate: {
        enable: true,
        package: 'egg-validate',

    },
};