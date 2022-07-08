
//
//19, Actualizando las notas publicas a privadas -> https://www.youtube.com/watch?v=kUAynvhin00&list=PLo5lAe9kQrwqUEXK7oQbzv63KsdODzuAy&index=20


const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = model('Note', NoteSchema);