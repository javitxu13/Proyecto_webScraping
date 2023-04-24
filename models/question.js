import moongoose from '../utils/mongoose.js';

const questionSchema = new moongoose.Schema({
    query : {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    ask: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
    links: {
        type: Array,
        required: false,
    },
});

const Question = moongoose.model('Question', questionSchema);

export default Question;