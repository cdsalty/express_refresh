import express from 'express';

const app = express();

const port = 3000;

app.use(express.json()); // what does this mean? It is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

let teaData = [];
let nextId = 1;

// Goal: Add to the teaData array, How many teas are in the array, update, delete, and get a specific tea... all using RESTful routes
// GET /teas - returns all teas - using the post route
// POST /teas - adds a new tea - using the post route

// Add a new tea to the teaData array
app.post('/teas', (req, res) => {
  const { name, price } = req.body; // destructuring the request body
  const newTea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  // res.status for status code, res.send will send the response
  res.status(201).send(newTea);
});

// get all the teas
app.get('/teas', (req, res) => {
  res.status(200).send(teaData);
});

// GET /teas/:id - returns a specific tea
// Get a specific tea
app.get('/teas/:id', (req, res) => {
  // parse int to compare number to number
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  // what if the tea is not found?
  if (!tea) {
    res.status(404).send('The tea you are searching for was not found.');
  }
  // if the tea is found, send the tea (similar to returning the tea)
  res.status(200).send(tea);
});

// Update a specific tea
app.put('/teas/:id', (req, res) => {
  // Below is also referred to as the business logic: the logic that is specific to the application
  // const teaId = req.params.id;
  // find the tea to update
  const teaToUpdate = teaData.find((tea) => tea.id === parseInt(req.params.id));
  console.log(`The teaToUpdate is ${teaToUpdate}`);
  if (!teaToUpdate) {
    res.status(404).send('The tea you are searching for was not found.');
  }
  // extract the name and price from the request body
  const { name, price } = req.body;
  // update the tea with the new name and price
  teaToUpdate.name = name;
  teaToUpdate.price = price;
  // send the updated tea
  res.status(200).send(teaToUpdate);
});

// Delete a specific tea
app.delete('/teas/:id', (req, res) => {
  // find the tea to delete
  const teaId = req.params.id;
  const indexedTea = teaData.findIndex((tea) => tea.id === parseInt(teaId));
  console.log(`The indexedTea is ${indexedTea}`);
  // what if the tea is not found?
  if (indexedTea === -1) {
    res.status(404).send('The tea you are searching for was not found.');
  }
  // The splice() method adds and/or removes array elements.
  // The first argument specifies the location at which to begin adding or removing elements. The second argument specifies the number of elements to remove.
  teaData.splice(indexedTea, 1);
  return res.status(200).send('successfully deleted.');
  // const teaToDelete = teaData.find((tea) => tea.id === parseInt(teaId));
  // if (!teaToDelete) {
  //   res.status(404).send('The tea you are searching for was not found.');
  // }
  // // delete the tea from the teaData array: with Filter
  // teaData = teaData.filter((tea) => tea.id !== parseInt(teaId));
  // // return the updated data: the tea that was deleted
  // res.status(200).send(teaToDelete);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
