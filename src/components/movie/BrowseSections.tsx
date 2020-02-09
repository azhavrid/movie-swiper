import React from 'react';
import { connect } from 'react-redux';

import { FlatList, StyleSheet } from 'react-native';

import SectionHorizontalScroll from './SectionHorizontalScroll';
import { RootState } from '../../redux/types';
import { SectionId } from '../../redux/sections/types';
import { refreshSectionRequest } from '../../redux/sections/actions';
import { browseSectionsKeys } from '../../redux/sections/sectionData';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

/* ------------- Class ------------- */
class BrowseSections extends React.PureComponent<Props> {
  componentDidMount() {
    this.fetchSectionsData();
  }

  fetchSectionsData = () => {
    const { refreshSectionRequest } = this.props;
    browseSectionsKeys.map(sectionKey => {
      refreshSectionRequest(sectionKey);
    });
  };

  renderSectionHorizontalScroll = ({ item }: { item: SectionId }) => <SectionHorizontalScroll sectionKey={item} />;

  render() {
    return (
      <FlatList
        data={browseSectionsKeys}
        style={styles.browseSection}
        keyExtractor={sectionKey => sectionKey}
        renderItem={this.renderSectionHorizontalScroll}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  browseSection: {
    alignSelf: 'stretch',
  },
});

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  refreshSectionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseSections);
