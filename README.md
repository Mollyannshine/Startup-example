# Dog Tracker
An example of a startup

## Startup deliverable - specification

### Elevator Pitch

Don’t you just love petting dogs you see out for walks? Don’t you wish there was a way to see and get to know all the dogs in your neighborhood? With this application, you’ll be able upload every instance of a dog you encounter and upload it to a map, as well as be able to view other users’ dog sightings. Users will be able to comment on your sighting and share the dog’s name or comment on their encounter with the dog! 

### Key Features 

-Users can login securely over https

-map view of all dog sightings

-create dog sighting

-create individual dog object

-ability to comment on other’s posts 

-ability to assign dog object to sighting instance

### Design

![260design](https://github.com/Mollyannshine/Startup-example/assets/131918682/cc278d25-e029-47d8-8f4f-238cbf9a4929)



### Technologies
HTML: Proper HTML structure. Two HTML pages. First the main page featuring the main map and login, and a second for creating a dog sighting. 

CSS: Styling the webpage to be visually appealing and easy to follow on many different screen sizes. 

JavaScript: Allows users to login, interactive map display, allows users to create sighting and comment on posts. Backend service calls. 

Service: login, retrieving dog sighting posts, submitting new dog sighting posts 

DB: stores users, sightings, and dog objects in database. 

Login: Users cannot comment or post unless logged in. Register and login users. Credentials stores in database. 

WebSocket: As each user, comments uploads a new post, or creates a new dog object, their changes are shared with other users 

React: Application ported to use the React web framework 

## HTML deliverable
I added the application structure
- **HTML pages** - Two HTML page that represent the ability to view the map, and submit sightings.
- **Links** - The sighting button links to the sighting form page (which will be a popup later). The sighting page has a back button and a submit button which both link back to the home page.
- **Text** - Shows currently logged in user and author.
- **Images** - Picture of a dog, on home page
- **Login** - Input boxes and submit button for login.
- **Database** - The map on the homepage will pull from the database.
- **WebSocket** - Not sure...unimplimented.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body** - All present on the homepage. Note that the popup page does not have all of these, because it is only supposed to be a pop up, and should be transitioned to such with the JS deliverable.
- **Navigation elements** - The sighting button takes you to the popup page. From there, the back and submit buttons take you back home. 
- **Responsive to window resizing** - Resizes well enough, mobile version is fair.
- **Application elements** - Will be less blank looking once the map is in. I have buttons and filters though.
- **Application text content** - Consistent fonts, descriptive labels.
- **Application images** - Nice dog icon. Might add more dogs pictures.

## JavaScript deliverable

For this deliverable I made my application functional to track dog sightings.

- **login** - When you click the button to log in, you can log in. It will display your name.
- **database** - Display the dog sightings on the map. implemented through MongoDB.
- **WebSocket** - I used the setInterval function to periodically display a random stat. Later this stat will be real, and pushed to users when it changes.
- **application logic** - Submit dog sightings and see them displayed on a real map!

## Service deliverable

For this deliverable I created an HTTP service to host my frontend and provide backend endpoints.

- **Node.js/Express HTTP service** - done!
- **Static middleware for frontend** - done!
- **Calls to third party endpoints** - Random dog picture, top right.
- **Backend service endpoints** - Submit sighting, update map, authentication.
- **Frontend calls service endpoints** - I did this using the fetch function.

## DB deliverable

For this deliverable I stored and retrieved data from MongoDB.

- **MongoDB Atlas database created** - done!
- **Endpoints for data** - My stubbed out endpoints now process the data and send it to Mongo.
- **Stores data in MongoDB** - done!
 
### Note that the lattitude and longitude need to be entered correctly, or the map may break when loading invalid data from MongoDB. I should add input validation. Erstwhile, do `lat, long`.

## Login deliverable

For this deliverable I added user registration and authentication.

- **User registration** - Creates a new account in the database.
- **existing user** - Verifies the user's name and password from data stored in the database
- **Use MongoDB to store credentials** - done!
- **Restricts functionality** - You cannot add sightings until you have logged in (there's no message yet, but the console logs 'no auth').

## WebSocket deliverable

For this deliverable I used webSocket to inform users of dog sightings in real time.

- **Backend listens for WebSocket connection** - done!
- **Frontend makes WebSocket connection** - done!
- **Data sent over WebSocket connection** - done!
- **WebSocket data displayed** - In the right bar, whenever a dog sighting is uploaded.
