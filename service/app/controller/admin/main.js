'use strict'

const Controller = require('egg').Controller;
class MainController extends Controller {
    async index() {
        this.ctx.body = "hi"
    }
    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = `SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = ${password}`
        console.log(sql);
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            //登录成功,进行session缓存
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId }

        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }
    async addOrder() {

        let tmpOrder = this.ctx.request.body
        // tmpArticle.
        const result = await this.app.mysql.insert('ord', tmpOrder)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body = {
            isScuccess: insertSuccess,
            insertId: insertId
        }
    }
    async updateOrder() {
        let tmpOrder = this.ctx.request.body
        // tmpArticle.
        const result = await this.app.mysql.update('ord', tmpOrder)
        const updateSuccess = result.affectedRows === 1

        this.ctx.body = {
            isScuccess: updateSuccess,
        }
    }

    async getOrderList() {
        let sql = 'SELECT id,' +
            'o_name,' +
            'o_num,' +
            'o_price,' +
            "FROM_UNIXTIME(o_time,'%Y-%m-%d' ) as Addtime," +
            's_id,' +
            'buyer_name ' +
            'FROM ord'
        const results = await this.app.mysql.query(sql)
        this.ctx.body = {
            list: results
        }
    }
    async delOrder() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('ord', { 'id': id })
        this.ctx.body = { data: res }
    }
    async getOrderById() {
        let id = this.ctx.params.id
        let sql = 'SELECT id,' +
            'o_name,' +
            'o_num,' +
            'o_price,' +
            "FROM_UNIXTIME(o_time,'%Y-%m-%d' )," +
            's_id,' +
            'buyer_name ' +
            'FROM ord ' +
            'WHERE id=' + id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }
    async getUserList() {
        let sql = 'SELECT *' +
            'FROM user'
        const results = await this.app.mysql.query(sql)
        this.ctx.body = {
            list: results
        }
    }
    async getOrderBySid() {
        let sid = this.ctx.params.sid
        let sql = 'SELECT id,' +
            'o_name,' +
            'o_num,' +
            'o_price,' +
            "FROM_UNIXTIME(o_time,'%Y-%m-%d' )," +
            's_id,' +
            'buyer_name ' +
            'FROM ord ' +
            'WHERE s_id=' + sid
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }

    }
    async getOrderByPid() {
        let pid = this.ctx.params.pid
        let sql = 'SELECT id,' +
            'o_name,' +
            'o_num,' +
            'o_price,' +
            "FROM_UNIXTIME(o_time,'%Y-%m-%d' )," +
            's_id,' +
            'buyer_name ' +
            'FROM ord ' +
            'WHERE s_id In (Select u_id From user Where p_id =' + pid + ')'
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }

    }
    async getOrderByFid() {

        let fid = this.ctx.params.fid
        let sql = 'select * from user where p_id=' + fid
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }
}
module.exports = MainController