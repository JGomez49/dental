
const {Router} = require('express');
const router = Router();
const {
    renderNotePetForm, 
    createNewNotePet, 
    renderNotesPet, 
    renderEditFormPet,
    updateNotePet,
    deleteNotePet,
    renderNotePetProfile,
    renderNewDentalFormPet
} = require('../controllers/notespet.controller');

const {isAuthenticated} = require('../helpers/auth');

//Get note Pet
router.get('/notespet/add', isAuthenticated, renderNotePetForm);

//New note Pet
router.post('/notespet/new-notepet', isAuthenticated, createNewNotePet);

//Get all notes Pet
router.get('/notespet', isAuthenticated, renderNotesPet);

//Edit notes Pet
    //Mostrar el formulario para editar
    router.get('/notespet/edit/:id', isAuthenticated, renderEditFormPet);

    //Actualizar lo que esta en el formulario
    router.put('/notespet/edit/:id', isAuthenticated, updateNotePet);

//Delete note Pet
router.delete('/notespet/delete/:id', isAuthenticated, deleteNotePet);


// Get the pet profile
router.get('/notespet/:id', isAuthenticated, renderNotePetProfile);

// Get the new dental form
router.get('/notespet/:id/newdentalupload', isAuthenticated, renderNewDentalFormPet);


module.exports = router;