import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// TODO: Resolve network provider
// import { NetworkProvider } from 'react-native-offline';

import { RootStack } from './routes/routes';
import { store, persistor } from './redux/store';
import globalStyles from './globalStyles';
import AppToast from './components/AppToast';

class App extends React.Component<{}, {}> {
  public render(): Element {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <NetworkProvider> */}
          <View style={globalStyles.screenContainer}>
            <RootStack />
            <AppToast />
          </View>
          {/* </NetworkProvider> */}
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
