import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Style {}

class App extends React.Component<{}, {}> {
  public render(): Element {
    return <View style={{ flex: 1, backgroundColor: 'red' }} />;
  }
}

const styles = StyleSheet.create<Style>({});

export default App;
