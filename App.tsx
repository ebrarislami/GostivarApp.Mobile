import React from 'react';
import 'react-native-gesture-handler'
import { Provider } from 'mobx-react';
import { useScreens } from 'react-native-screens';
import AppContainer from './src/navigation/navigation';
import { stores } from './src/stores/index';
import navigationService from './src/navigation/navigationService';

useScreens();

const App = () => {
  return (
    <Provider {...stores}>
      <AppContainer ref={navigatorRef => {
        navigationService.setTopLevelNavigator(navigatorRef);
      }} />
    </Provider>
  );
};

export default App;