import React from 'react';
import { Provider } from 'mobx-react'
import AppContainer from './src/navigation/navigation';
import { stores } from './src/stores/index';
import navigationService from './src/navigation/navigationService';

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