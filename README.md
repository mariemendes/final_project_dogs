# DOGS - SOCIAL MEDIA FOR DOGS

Social media platform for dogs made using React. It allows dog owners and dog lovers to connect with each other and share content about their furry friends.

## Features

- User authentication: Users can sign up, log in, log out, reset password securely.
- Users can post photos of their dogs and information about them, or delete them as needed.
- Newsfeed: Users can view a newsfeed of posts from other users and share the link with them(you can click on the name of the pet and see the page of the picture and you can also click on the name of the users and see all the pictures that this particular user posted)
- Responsive design: The app is optimized for use on desktop, tablet, and mobile devices.

## Getting started

To run the app locally, follow these steps:

1.  Clone the repository: git clone https://github.com/mariemendes/final_project_dogs_Mariane_Mendes
2.  Install dependencies into server-side(server folder) **AND** client-server(src folder) side folder:
    `npm install`
3.  a) After that you can run into the server side:
    `npm run dev`
    b) and run into the client server:
    `npm start`
4.  You can also build the client-side using webpack:
    `npm run build`

## Test Applications

1. You can the login informations to test some of the features.
   login: cat
   password: cat
   ps. if you need to test the forgot password you should create an user first with an active email.
   ps1. sometimes the reset password email goes to the junk email.

## Photos - Resources

**Login Page:** https://unsplash.com/pt-br/fotografias/JT-d0vVrUuA
The other images are all from https://unsplash.com
https://unsplash.com/pt-br/fotografias/yihlaRCCvd4
https://unsplash.com/pt-br/fotografias/Sg3XwuEpybU
https://unsplash.com/pt-br/fotografias/2l0CWTpcChI
https://unsplash.com/pt-br/fotografias/N04FIfHhv_k
https://unsplash.com/pt-br/fotografias/U3aF7hgUSrk

## Content - Resources

**React:** https://legacy.reactjs.org/. and https://react.dev/
**General Question:** https://www.w3schools.com/

## API Documentation

The API provides the following endpoints and Methods:

**1. /login**

- **Method:** POST
- **Description:** Authenticates the user and generates a token for subsequent requests.
- **Expected POST Body Format:**
  {
  "username": string,
  "password": string
  }

**2. /myuser**

- **Method:** POST
- **Description:** Validates the user's token.
- **Expected POST Body Format:** Token string

**3. /myuser**

- **Method:** GET
- **Description:** Retrieves the current user's data.
- **Expected POST Body Format:** Token string

**4. /users**

- **Method:** POST
- **Description:** Creates a new user.

**5. /photo**

- **Method:** POST
- **Description:** Uploads a new photo.
- **Expected POST Body Format:** FormData object containing the photo file

**6. /photo/:filter**

- **Method:** GET
- **Description:** Retrieves a list of photos.
- **Expected POST Body Format:** None

**7. /photo/:id**

- **Method:** GET
- **Description:** Retrieves a specific photo.
- **Expected POST Body Format:** None

**8. /users/:username**

- **Method:** GET
- **Description:** Retrieves a user's data by username.
- **Expected POST Body Format:** None

**9. /photo/:id**

- **Method:** DELETE
- **Description:** Deletes a photo.
- **Expected POST Body Format:** Token string

## Response Format

All responses from the API are in JSON format.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion for a new feature, please send me an email **marianemendes1104@gmail.com**
