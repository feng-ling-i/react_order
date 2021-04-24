module.exports = app => {
    const { router, controller } = app
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index', controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    router.post('/admin/addOrder', adminauth, controller.admin.main.addOrder)
    router.post('/admin/updateOrder', adminauth, controller.admin.main.updateOrder)
    router.get('/admin/getOrderList', adminauth, controller.admin.main.getOrderList)
    router.get('/admin/delOrder/:id', adminauth, controller.admin.main.delOrder)
    router.get('/admin/getOrderById/:id', adminauth, controller.admin.main.getOrderById)
    router.get('/admin/getUserList', adminauth, controller.admin.main.getUserList)
    router.get('/admin/getOrderBySid/:sid', adminauth, controller.admin.main.getOrderBySid)
    router.get('/admin/getOrderByPid/:pid', adminauth, controller.admin.main.getOrderByPid)
    router.get('/admin/getOrderByFid/:fid', adminauth, controller.admin.main.getOrderByFid)






}