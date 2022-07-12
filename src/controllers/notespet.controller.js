


const notesPetCrtl = {};
const NotePet = require('../models/Notepet');

const path = require('path');
const {unlink} = require('fs-extra');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

notesPetCrtl.renderNotePetForm = (req,res)=>{
    // res.send('Add a note...');
    console.log('user_id: ' + req.user.id);
    res.render('notespet/new-notepet');
}

notesPetCrtl.createNewNotePet = async(req,res)=>{
    console.log(req.body);
    //el req.body es lo que se recibe desde el formulario
    // res.send('Create note...');
    // const image = new NotePet();
    console.log('>> Este es req.file.path:')
    console.log(req.file.path)
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log('>> Este es result:')
    console.log(result)
    // const{
    //     title, 
    //     description
    // } = req.body;
    const newNotePet = new NotePet({
        // title: title,
        // description: description,
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        filename: req.file.filename,
        path: result.url,
        public_id: result.public_id,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        precio: req.body.precio,
        comments: req.body.comments,
        // fecha_upload: moment().format('LL'),
        kin_name: req.body.kin_name,
        phone: req.body.phone,
        email: req.body.email,
        how: req.body.how,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        diet: req.body.diet,
        health: req.body.health,
        withanest: req.body.withanest,
        noanest: req.body.noanest,
    });
    // newNotePet.user = req.user.id;
    await unlink(req.file.path);
    await newNotePet.save();
    req.flash('success_msg','Note added successfully');
    console.log('>> From createNewNotePet, newNotePet:')
    console.log(newNotePet);
    res.redirect('/notespet');
}

notesPetCrtl.renderNotesPet = async (req,res)=>{
    // res.send('Get all notes...');
    const notesPet = await NotePet.find({
        user: req.user.id
    }).sort({title: 'asc'});
    res.render('notespet/all-notespet', {notesPet});
};


notesPetCrtl.renderEditFormPet = async(req,res)=>{
    // res.send('Edit note...');
    const notePet = await NotePet.findById(req.params.id);
    if(notePet.user != req.user.id){
        req.flash('error_msg','Not authorized user for the URL');
        return res.redirect('/notespet');
    }
    console.log('>> From renderEditFormPet, notePet: ');
    console.log(notePet);
    res.render('notespet/edit-notepet', {notePet:notePet});
}

notesPetCrtl.updateNotePet = async (req,res)=>{
    // res.send('Update note...');
    // console.log(req.body);
    const {title, description} = req.body;
    await NotePet.findByIdAndUpdate(req.params.id, {
        title, 
        comments: description
    });
    req.flash('success_msg','Note updated successfully');
    res.redirect('/notespet');
}

notesPetCrtl.deleteNotePet = async (req,res)=>{
    console.log('>>> From deleteNotePet, req.params.id: ');
    console.log(req.params.id);
    const notesPet = await NotePet.findById(req.params.id)    
    console.log('>>> From deleteNotePet, public_id: ');
    console.log(notesPet.public_id);
    await cloudinary.v2.uploader.destroy(notesPet.public_id);
    await NotePet.findByIdAndDelete(req.params.id);    
    req.flash('success_msg','Note deleted successfully');
    res.redirect('/notespet');
}


notesPetCrtl.renderNotePetProfile = async (req,res)=>{
    const notesPet = await NotePet.findById(req.params.id)
    const dentalsPet = await NotePet.find({precio: req.params.id})
    res.render('notespet/pet-profile', {notesPet, dentalsPet});
}
notesPetCrtl.renderNewDentalFormPet = async (req,res)=>{
    const notesPet = await NotePet.findById(req.params.id)
    res.render('notespet/new-dentalpet', {notesPet});
}


module.exports = notesPetCrtl;