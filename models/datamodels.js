const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    nodeName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    parent:{
        type: Number,
        required: true
    },
    readOnly: {
        type: Number,
        required: true
    }
});

mongoose.model('Data', dataSchema);