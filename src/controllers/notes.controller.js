// Al igual que index.controller.js, en este archivo se definen las funciones
// que despues seran llamadas desde notes.routes.js

//https://www.youtube.com/watch?v=8sXcFXFOWK4
//https://www.youtube.com/watch?v=htlt7L8Yl1k
//https://www.youtube.com/watch?v=dFb1r4rUYMQ
//https://www.youtube.com/watch?v=PQL_iwLKnRg
//// connect-flash: https://www.youtube.com/watch?v=YR5AmzlO-Ww

//19. Actualizando las notas publicas a privadas -> https://www.youtube.com/watch?v=kUAynvhin00&list=PLo5lAe9kQrwqUEXK7oQbzv63KsdODzuAy&index=20

const notesCrtl = {};
const Note = require('../models/Note');

notesCrtl.renderNoteForm = (req,res)=>{
    // res.send('Add a note...');
    console.log('user_id: ' + req.user.id);
    res.render('notes/new-note');
}

notesCrtl.createNewNote = async(req,res)=>{
    console.log(req.body);
    // res.send('Create note...');
    const{title, description}=req.body;
    //Se puede obviar title de la propiedad title porque
    //tienen el mismo nombre. Lo dejo para referencia.
    const newNote = new Note({
        title: title,
        description: description
    });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg','Note added successfully');
    console.log(newNote);
    res.redirect('/notes');
}

notesCrtl.renderNotes = async (req,res)=>{
    // res.send('Get all notes...');
    const notes = await Note.find({
        user: req.user.id
    }).sort({createdAt: 'desc'});
    res.render('notes/all-notes', {notes});
};

notesCrtl.renderEditForm = async(req,res)=>{
    // res.send('Edit note...');
    const note = await Note.findById(req.params.id);
    if(note.user != req.user.id){
        req.flash('error_msg','Not authorized user for the URL');
        return res.redirect('/notes');
    }
    console.log(note);
    res.render('notes/edit-note', {note:note});
}

notesCrtl.updateNote = async (req,res)=>{
    // res.send('Update note...');
    // console.log(req.body);
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg','Note updated successfully');
    res.redirect('/notes');
}

notesCrtl.deleteNote = async (req,res)=>{
    // res.send('Delete a note');
    // console.log(req.params.id);
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note deleted successfully');
    res.redirect('/notes');
}
module.exports = notesCrtl;