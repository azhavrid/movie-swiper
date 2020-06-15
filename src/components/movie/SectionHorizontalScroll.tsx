import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { sectionData } from '../../redux/sections/sectionData';
import { getSectionSelectorByKey } from '../../redux/sections/selectors';
import { SectionKey } from '../../redux/sections/types';
import { RootState } from '../../redux/types';
import { routeNames } from '../../routes/routeNames';
import { SectionListScreenNavigationParams } from '../../screens/movie/SectionListScreen';
import { theme } from '../../theme';
import { getFontStyle } from '../../utils/fonts';
import { AppText, TextButton } from '../common';
import MoviesHorizontalFlatList from './MoviesHorizontalFlatList';

/* ------------- Props and State ------------- */
type OwnProps = {
  sectionKey: SectionKey;
};

type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps & OwnProps & NavigationInjectedProps;

/* ------------- Component ------------- */
class SectionHorizontalScroll extends React.PureComponent<Props> {
  onMorePress = () => {
    const { navigation, sectionKey } = this.props;
    const params: SectionListScreenNavigationParams = { sectionKey };
    navigation.navigate(routeNames.SectionListScreen, params);
  };

  render() {
    const { section, sectionKey } = this.props;
    const { movieIds } = section;
    const { title } = sectionData[sectionKey];

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <AppText style={styles.title} type="title2">
            {title}
          </AppText>
          <TextButton
            text="MORE"
            style={styles.moreButton}
            textStyle={styles.moreButtonText}
            onPress={this.onMorePress}
          />
        </View>
        <MoviesHorizontalFlatList movieIds={movieIds} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.small,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: theme.spacing.small,
  },
  moreButton: {
    padding: theme.spacing.tiny,
  },
  moreButtonText: {
    ...getFontStyle({ weight: 'SemiBold' }),
  },
});

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const sectionKey = ownProps.sectionKey;
  return {
    sectionKey,
    section: getSectionSelectorByKey(sectionKey)(state),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SectionHorizontalScroll));
