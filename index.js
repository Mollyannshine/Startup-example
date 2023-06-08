const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
// app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Try to follow the protocol: https://www.rfc-editor.org/rfc/rfc9110.html#name-posthttps://www.rfc-editor.org/rfc/rfc9110.html#name-post
// Routes go first, then their helpers last

apiRouter.post('/addSighting', (req, res) => {
  console.log(req.body);
  mongoAddSighting(req.body);
  res.status(201).json({ placeholder: true });
});

apiRouter.delete('/removeSighting', (req, res) => {
  mongoRemoveSighting();
  res.status(200).json({ placeholder: true });
});

apiRouter.get('/getMapData', (req, res) => {
  mongoGetMapData();
  res.status(200).json({ placeholder: true });
});

apiRouter.post('/login', (req, res) => {
  const authStatus = authenticate();
  if (authStatus) {
    res.status(200).json({ placeholder: true });
  } else {
    res.status(403).json({ placeholder: true });
  }
});

// Add endpoint to filter map

// Helpers
function mongoAddSighting(sighting) {
  // Note that localStorage is only defined on the client.
  // localStorage.setItem(sighting.time, sighting);
}
function mongoRemoveSighting() {}
function mongoGetMapData() {}
function authenticate() {}
// DB setup

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  console.log("Sending default page");
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

