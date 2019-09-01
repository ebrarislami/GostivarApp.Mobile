import React from 'react';
import AppContainer from './src/navigation/navigation';
import { stores } from './src/stores/index';
import { Provider } from 'mobx-react'

const App = () => {
  return (
    <Provider {...stores}>
      <AppContainer />
    </Provider>
  );
};

export default App;