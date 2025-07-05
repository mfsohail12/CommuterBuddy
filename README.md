# Commuter Buddy React App

A React application that helps users find commute companions through a simple five-step navigation flow.

## Features

- **Five-step navigation flow**: Home → University Selection → Transit Selection → Connection → Map
- **State management**: Data passed between routes using React Router's state
- **Interactive maps**: Integration with React Leaflet for location display
- **Responsive design**: Built with Tailwind CSS
- **Mock data**: Includes sample transit options and user information

## Tech Stack

- React 19.1.0 (JavaScript)
- React Router DOM 7.6.3 for routing
- Tailwind CSS 4.1.11 for styling
- React Leaflet 5.0.0 for interactive maps
- Leaflet 1.9.4 for mapping functionality

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Chat Feature

This app includes a real-time chat feature powered by Flask-SocketIO.

### Setup Chat Server

1. **Install Python dependencies**:
   ```bash
   pip install flask flask-cors flask-socketio
   ```
   Or use the requirements file:
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the chat server**:
   ```bash
   python chat_server.py
   ```
   The server will run on http://localhost:5000

3. **Start the React app**:
   ```bash
   npm start
   ```
   The app will run on http://localhost:3000

### Using the Chat

- Navigate through the app flow to reach the Map page
- Click the green "💬 Chat" button in the bottom-right corner
- Start chatting with other users in the same room
- Each buddy connection creates a unique chat room based on the buddy ID
