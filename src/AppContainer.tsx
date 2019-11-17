import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Application from './Application';
import { store, persistor } from './redux/store';

class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Application />
        </PersistGate>
      </Provider>
    );
  }
}

export default AppContainer;
