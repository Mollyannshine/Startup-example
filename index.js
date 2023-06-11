const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const sightingsCollection = client.db("startup").collection("dogs");
const userCollection = client.db("startup").collection("users");
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
// When this was commented out req.body was undefined
app.use(express.json());

app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Try to follow the protocol: https://www.rfc-editor.org/rfc/rfc9110.html#name-posthttps://www.rfc-editor.org/rfc/rfc9110.html#name-post
// Routes go first, then their helpers last

apiRouter.post('/addSighting', (req, res) => {
  console.log("addSighting request cookies:\n", req.cookies);
  mongoAddSighting(req.body);
  res.status(201).json({ placeholder: true });
});

apiRouter.delete('/removeSighting', (req, res) => {
  mongoRemoveSighting();
  res.status(200).json({ placeholder: true });
});

apiRouter.get('/getMapData', async (req, res) => {
  const data = await mongoGetMapData();
  res.status(200).json(data);
});

// Add endpoint to filter map

// createAuthorization from the given credentials
app.post('/auth/create', async (req, res) => {
  if (await getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
    });
  }
});

// loginAuthorization from the given credentials
app.post('/auth/login', async (req, res) => {
  const user = await getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// getMe for the currently authenticated user
app.get('/user/me', async (req, res) => {
  authToken = req.cookies['token'];
  const user = await userCollection.findOne({ token: authToken });
  if (user) {
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Helpers
function mongoAddSighting(sighting) {
  sightingsCollection.insertOne(sighting);
}
function mongoRemoveSighting() {}
function mongoGetMapData() {
  return sightingsCollection.find().toArray();
}
function authenticate() { return true; }
// DB setup

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  console.log("Sending default page");
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

