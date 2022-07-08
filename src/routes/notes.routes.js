
//13, Actualización de Notas de la base de datos -> https://www.youtube.com/watch?v=PQL_iwLKnRg&list=PLo5lAe9kQrwqUEXK7oQbzv63KsdODzuAy&index=14
//18, Proteger las rutas de Express con Passport -> https://www.youtube.com/watch?v=EdBZQ6IdlYs&list=PLo5lAe9kQrwqUEXK7oQbzv63KsdODzuAy&index=19

// En este archivo estan las tareas basicas como listar, actualizar, etc

const {Router} = require('express');
const router = Router();
const {
    renderNoteForm, 
    createNewNote, 
    renderNotes, 
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth');


//Get note
router.get('/notes/add', isAuthenticated, renderNoteForm);

//New note
router.post('/notes/new-note', isAuthenticated, createNewNote);

//Get all notes
router.get('/notes', isAuthenticated, renderNotes);

//Edit notes
    //Mostrar el formulario para editar
    router.get('/notes/edit/:id', isAuthenticated, renderEditForm);

    //Actualizar lo que esta en el formulario
    router.put('/notes/edit/:id', isAuthenticated, updateNote);

//Delete note
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;