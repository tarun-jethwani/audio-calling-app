# Frontend Audio Calling App

This is the frontend part of the audio calling application built using React and TypeScript. The application allows users to initiate and manage audio calls.

## Project Structure

- **src/**: Contains the source code for the application.
  - **components/**: Contains React components for the application.
    - **CallButton.tsx**: Button to initiate a call.
    - **Status.tsx**: Displays the current call status.
    - **EndCallButton.tsx**: Button to end the call.
  - **App.tsx**: Main application component that manages call state.
  - **index.tsx**: Entry point for the React application.

- **public/**: Contains static files.
  - **index.html**: Main HTML file for the application.

- **package.json**: Configuration file for npm, listing dependencies and scripts.

- **tsconfig.json**: TypeScript configuration file.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd audio-calling-app/frontend
   ```

2. **Install Dependencies**
   Make sure you have Node.js and npm installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application**
   To start the development server, run:
   ```bash
   npm start
   ```

4. **Build for Production**
   To create a production build, run:
   ```bash
   npm run build
   ```

## Usage

- Click the "Call" button to initiate an audio call.
- The status of the call will be displayed on the screen.
- Click the "End Call" button to terminate the call.

## Component Descriptions

- **CallButton**: Triggers the audio call when clicked.
- **Status**: Shows the current status of the call (e.g., "Calling", "In Call", "Ended").
- **EndCallButton**: Ends the audio call when clicked.

## Deployment

The frontend application can be deployed to a CDN on AWS. Ensure that the build files are uploaded to an S3 bucket configured for static website hosting.

## License

This project is licensed under the MIT License.