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
const { WebSocketServer } = require('ws');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

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

// Websocket
// Create a websocket object
const wss = new WebSocketServer({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

// Keep track of all the connections so we can forward messages
let connections = [];

wss.on('connection', (ws) => {
  const connection = { id: connections.length + 1, alive: true, ws: ws };
  connections.push(connection);
  console.log('connections are:');
  connections.forEach((c) => console.log('    ', c.id));
  console.log(`${connections}`);

  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    console.log(`got message ${data}\n    from ${connection.id}`);
    connections.forEach((c) => {
      console.log(`con ${c.id}`);
      if (c.id !== connection.id) {
        console.log(`forwarding ${data}\n    to ${c.id}`);
        c.ws.send(data);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });

  // Respond to pong messages by marking the connection alive
  ws.on('pong', () => {
    connection.alive = true;
  });
});

// Keep active connections alive
setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);