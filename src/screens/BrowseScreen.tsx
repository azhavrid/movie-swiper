import React from 'react';
import { View } from 'react-native';

import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import MovieSearchWrapper from '../components/movie/MovieSearchWrapper';
import { globalStyles } from '../globalStyles';
import BrowseSections from '../components/movie/BrowseSections';

/* ------------- Props and State ------------- */
type Props = NavigationStackScreenProps<{}>;

/* ------------- Class ------------- */
class Browse extends React.Component<Props> {
  render() {
    return (
      <View style={globalStyles.screenContainer}>
        <MovieSearchWrapper>
          <BrowseSections />
        </MovieSearchWrapper>
      </View>
    );
  }
}

export default withDelayedLoading(Browse);
