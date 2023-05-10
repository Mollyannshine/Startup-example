# Startup-example
An example of a startup


Startup deliverable - specification

Elevator Pitch

Don’t you just love petting dogs you see out for walks? Don’t you wish there was a way to see and get to know all the dogs in your neighborhood? With this application, you’ll be able upload every instance of a dog you encounter and upload it to a map, as well as be able to view other users’ dog sightings. Users will be able to comment on your sighting and share the dog’s name or comment on their encounter with the dog! 

Key Features 

-Users can login securely over https

-map view of all dog sightings

-create dog sighting

-create individual dog object

-ability to comment on other’s posts 

-ability to assign dog object to sighting instance

Design

![260design](https://github.com/Mollyannshine/Startup-example/assets/131918682/cc278d25-e029-47d8-8f4f-238cbf9a4929)



Technologies
HTML: Proper HTML structure. Two HTML pages. First the main page featuring the main map and login, and a second for creating a dog sighting. 

CSS: Styling the webpage to be visually appealing and easy to follow on many different screen sizes. 

JavaScript: Allows users to login, interactive map display, allows users to create sighting and comment on posts. Backend service calls. 

Service: login, retrieving dog sighting posts, submitting new dog sighting posts 

DB: stores users, sightings, and dog objects in database. 

Login: Users cannot comment or post unless logged in. Register and login users. Credentials stores in database. 

WebSocket: As each user, comments uploads a new post, or creates a new dog object, their changes are shared with other users 

React: Application ported to use the React web framework 

