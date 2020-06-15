import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { refreshSectionRequest } from '../../redux/sections/actions';
import { browseSectionsKeys } from '../../redux/sections/sectionData';
import { SectionKey } from '../../redux/sections/types';
import SectionHorizontalScroll from './SectionHorizontalScroll';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

/* ------------- Component ------------- */
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

  renderSectionHorizontalScroll = ({ item }: { item: SectionKey }) => <SectionHorizontalScroll sectionKey={item} />;

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

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  refreshSectionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseSections);
