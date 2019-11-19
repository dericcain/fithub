# FitHub

## Setup
1. Setup React Native by [following the instructions here](https://facebook.github.io/react-native/docs/getting-started)
2. Clone this repo: `git clone git@gitlab.com:daxko/labdays/fithub.git`
3. [Make sure you have Yarn installed](https://yarnpkg.com/en/docs/install#mac-stable) and then install dependencies: `yarn install`
4. Run the simulators: `yarn ios` or `yarn android` 

## Technology
- React Native - https://facebook.github.io/react-native/docs/getting-started
- React Navigation - https://reactnavigation.org/en/
- React Native Elements - https://react-native-elements.github.io/react-native-elements/
- Styled Components - https://www.styled-components.com/docs/basics#react-native
- Firebase/React Native Firebase - https://invertase.io/oss/react-native-firebase/
- react-easy-state - https://github.com/solkimicreb/react-easy-state

## Folder Structure
Most everything will be located in the `src` folder.
- src/components - These is where all sharable components will go, i.e., images. icons, etc.
- src/screens - This is where all of the app's screens will go. Within this folder, there are three folders
- src/screens/app - A user must be logged in to be in this part of the app
- src/screens/auth - This is how the user will login/create an account
- src/screens/auth-loading - This is the first screen that loads and detects whether the user is logged in
and then redirects them to the correct screen accordingly.
- src/stores - This is where all domain objects will go as well as the business to manage those domain objects
- src/utils - This is a catch all for helper utilities
