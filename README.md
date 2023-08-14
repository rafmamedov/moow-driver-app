# MOOW Driver App Prototype

This is a prototype navigation app built using React Native and Expo.
<br>
<br>
The app fulfills the following tasks:

## Implemented Tasks

- Created a bottom navigation bar.
- Implemented the app according to the provided design.
- Integrated Google Maps API for map functionalities.
- Implemented plotting a route from point A to point B.
- Implemented plotting an alternative routes.
- Implemented displaying a modal window showing the distance and approximate travel time from point A to point B.
- Upon route selection, displaying the user's location and plotting a route from the user's location to point A.
- Implemented dynamically updating the user's location during movement.
- Implemented functionality for the top menu according to the design: displaying the car's number and photo (static), automatically showing the addresses of point A and point B, set a static date and time for point A, and calculated the date and time for point B based on the estimated travel time.
- Implemented functionality for the top menu in the second screen: displaying the address of point A and the user's location.

## Project Details

- Language: TypeScript
- Technology: React Native and Expo
- API: Google Maps

## Installation and Running (iOS with Expo)

1. Clone this repository to your local machine.
2. Navigate to the project folder using the terminal.
3. Run the following commands:

```sh
# Install Expo CLI globally if not installed
npm install -g expo-cli

# Install project dependencies
npm install

# Start the development server
npx expo start
```

4. After running npx expo start, a QR code will be displayed in the terminal.
5. If not already installed, install the Expo Go app on your iOS device and sign up there.
6. Use the Expo Go app to follow the QR code displayed in the terminal. This will open the app on your device for testing.

### Please note that this is a prototype and may not include all features. It is intended for testing and design validation purposes only.
