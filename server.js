// require express and other modules
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
let todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   console.log('index get', todos);
   res.json({data:todos});

});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
    //save form submission as new to do
    let newToDo = req.body;
    //print new task to terminal
    console.log(newToDo);
    //have newID =  ID of last task in array, then add 1.
    let NewID = todos[todos.length-1]._id + 1;
    //assign new id to the new task.
    newToDo._id = NewID;
    //add new todo item
    todos.push(newToDo);
    //print new list of todos with addition
    console.log(todos);
    res.json(newToDo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
    console.log(req.params.id);
    for (let i=0; i<todos.length; i++) {
      console.log("moving through loop index is", i);
      if (todos[i]._id==req.params.id) {
        res.json(todos[i]);
      }
    }
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   let todoId = (req.params.id);

    // find todo to update by its id
    let todoUpdate = todos.filter(function (todo) {
      return todo._id == todoId;
    })[0];

    // update the todo's task
    todoUpdate.task = req.body.task;

    // update the todo's description
    todoUpdate.description = req.body.description;

    res.json(todoUpdate);

});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   //retrieve ID from URL
  //  let todoforDelete = req.params.id;
   for (let i=0; i<todos.length; i++) {
     console.log("searching for match to delete..", i);
     if (todos[i]._id==req.params.id) {todos.splice(todos[i], 1);
       res.json(todos[i]);
     }
   }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
