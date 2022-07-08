// Se hace un objeto para definir las funciones y despues llamarlas
// desde index.router.js

const indexCtrl = {};

indexCtrl.renderIndex = (req,res)=>{
    res.render('index.hbs')
};

indexCtrl.renderAbout = (req,res)=>{
    res.render('about.hbs')
};

module.exports = indexCtrl;