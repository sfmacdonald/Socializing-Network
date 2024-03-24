# Socializing-Network
NoSQL API for a social network

## Table of Contents

- [Project Name](#socializing-network)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Features](#features)
- [Usage](#usage)
- [Testing](#testing)

# Description

Social network web application utilizing APIs where users can share their thoughts, react to friends’ thoughts, and create a friend list. This application leverages Express.js for routing, a MongoDB database, and the Mongoose ODM

# User Story

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

# Acceptance Criteria

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

# Features

This appllication has the following features and functions:

1. Ability for user to create a user profile

2. Ability for user to create a thought to add to their profile

## Usage

The github repository may be found at https://github.com/sfmacdonald/Socializing-Network

See attached screenrecording for demonstration:

## Testing

Testing may be accomplished manually by:

1. To create a user:
    - Utilizing Insomnia,input http://localhost:3005/api/users into the address bar and select "POST" from the dropdown menu.
    - In the JSON, include the following data:
        {
	    "username": "example_user",
        "email": "user@example.com",
        "password": "password123"
        }
    - Send this as a "POST" request to /api/users route.
    - User creation may confirmed by changing "POST" to "GET" from the dropdown menu.
        - The response will display the newly created user
    
2. To create a thought:
    - Utilizing Insomnia,input http://localhost:3005/api/thoughts into the address bar and select "POST" from the dropdown menu.
    - In the JSON, include the following data:
       {
        "thoughtText": "This is a new thought.",
        "username": "example_user",
        "userId": "user_id"
       } 
   - Send this as a "POST" request to /api/thoughts route along with the username of the user who is creating the thought. The user_id will need to be found with a "GET" action from api/users
   - Thought creation may confirmed by changing "POST" to "GET" from the dropdown menu.
        - The response will display the newly created thought and the user it belongs to.

3. To delete a thought:
    - Utilizing Insomnia,input http://localhost:3005/api/thoughts into the address bar and select "DELETE" from the dropdown menu.
        - The "thought_id" will need to be included in the addres bar
    - Send this as a "DELETE" request to /api/thoughts route.
    - Thought deletion may confirmed by changing "DELETE" to "GET" from the dropdown menu.
        - The response will display without the thought

4. To delete a user:
    - Utilizing Insomnia,input http://localhost:3005/api/users into the address bar and select "DELETE" from the dropdown menu.
        - The "user_id" will need to be included in the addres bar
    - Send this as a "DELETE" request to /api/users route.
    - User deletion may confirmed by changing "DELETE" to "GET" from the dropdown menu.
        - The response will display without the deleted user
    