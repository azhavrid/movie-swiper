import { createSelector } from 'reselect';

import { RootState } from '../types';
import { SectionId } from './types';

export const sectionsStateSelector = (state: RootState) => state.sections;

export const getSectionSelectorByKey = (sectionKey: SectionId) =>
  createSelector(sectionsStateSelector, sections => sections[sectionKey]);
