const { Schema, model } = require('mongoose');

const citizenSchema = new Schema({
    name: String,
    surname: String,
    gender: String,
    dateOfBirth: Date,
    matrialStatus: String,
    education: String,
    region: String,
    district: String,
    community: String,
    city: String,
    street: String,
    zipCode: String,
    buildingNumber: String,
    registeredAddress: String,
    workplace: String,
    worktype: String,
    typeOfEmploymentContract: String,
    earnings: Number,
    spouse:  String, //ID,Pesel
    kids: Number,
    householdMembers: Number,
    id: String,
    nationality: String,
    isDisabled: Boolean,
});

module.exports = model('Citizen', citizenSchema);