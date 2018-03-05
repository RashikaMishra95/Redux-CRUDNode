var controller=require('../controllers/projController');

module.exports=(app,passport)=>{

    app.post('/users',controller.createUser);
    app.post('/lang',controller.addlang);
    app.post('/proj',controller.addProj);
    app.post('/project',controller.add);
    app.get('/list',controller.list);
    app.post('/del/:id',controller.del);
    app.post('/edit/:id',controller.edit);

};