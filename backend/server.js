const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const router = express.Router();

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log('MongoDB database connection workiing' + PORT)

})


router
    .route('/')
    .get(function (req, res) {
        Todo.find(function (err, todos) {
            if (err) {
                console.log(err);
            } else {
                res.json(todos);
            }
        });
    });

router
    .route('/:id')
    .get(function (req, res) {
        let id = req.params.id;
        router.findById(id, function (err, todo) {
            res.json(todo);
        });
    });

router
    .route('/add')
    .post(function (req, res) {
        let todo = new Todo(req.body);
        todo.save()
            .then(todo => {
                res.status(200)
                    .json({
                        'todo': "todo added"
                    });
            })
            .catch(err => {
                res
                    .status(400)
                    .send("it didn't work");
            });
    });

router
.route('/update/:id')
.post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res
            .status(404)
            .send('data not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_prioity = req.body.todo_prioity;
            todo.todo_completed = req.body.todo_completed;

        todo.save()
        .then(todo => {
                res.json('Todo Updated')
            })
            .catch(err => {
                res.status(400).send('update not possible');
            })
    });
});

app.use('/todos', router);

app.listen(PORT, function () {
    console.log("Server is running on PORT:" + PORT);
});