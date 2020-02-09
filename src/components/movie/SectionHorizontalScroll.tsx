import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import MoviesHorizontalFlatList from './MoviesHorizontalFlatList';
import { AppText, AppButton } from '../common';
import { routeNames } from '../../routes/routeNames';
import { getFontStyle } from '../../utils/fonts';
import { theme } from '../../theme';
import { Section, SectionId } from '../../redux/sections/types';
import { SectionListScreenNavigationParams } from '../../screens/movie/SectionListScreen';
import { sectionData } from '../../redux/sections/sectionData';
import { connect } from 'react-redux';
import { RootState } from '../../redux/types';
import { getSectionSelectorByKey } from '../../redux/sections/selectors';

/* ------------- Props and State ------------- */
type OwnProps = {
  sectionKey: SectionId;
};

type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps & OwnProps & NavigationInjectedProps;

/* ------------- Class ------------- */
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
          <AppButton onlyText style={styles.moreButton} textStyle={styles.moreButtonText} onPress={this.onMorePress}>
            MORE
          </AppButton>
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
