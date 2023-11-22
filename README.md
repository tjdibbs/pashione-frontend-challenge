# Pashione Frontend Test


### How to Setup
- Install modules  ```npm i``` 
- Run Dev Server ```npm run dev``` and open http://localhost:4000

 To Run the Cypress
- Make sure Dev Server is running on port 4000, then run ```npm run cy:open``` to open cypress
- Click on `end-2-end-test` and select you preferred browser `i.e chrome`


### Core Libraries
- [Antd](https://ant.design) - For some ready made components
- [Tailwind CSS](https://tailwindcss.com) - For Styling and Theme Control
- [React Router](https://reactrouter.com) - For Routing

## Project Structure

- There is only 1 route `/users/*`, any other routes is redirected to the only routes available to avoid error 404 not found
---
- When viewing a single user, a `Drawer` show up, after the it match the required route that will look like `http://localhost:4000/users/:user_id`
---
- I have a `User Action Component` that handles both `Adding User` and `Editing User` dynamically.
