import { createSelector } from 'reselect';

import { RootState } from '../types';
import { SectionKey } from './types';

export const sectionsStateSelector = (state: RootState) => state.sections;

export const getSectionSelectorByKey = (sectionKey: SectionKey) =>
  createSelector(sectionsStateSelector, sections => sections[sectionKey]);
