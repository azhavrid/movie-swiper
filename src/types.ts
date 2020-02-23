/* ------------- Other ------------- */
export type ValuesOf<T> = T[keyof T];

// Correct props type for React components with default props
export type WithDefaultProps<Props, DefaultProps> = Partial<DefaultProps> & Omit<Props, keyof DefaultProps>;

// Temporary fix for react functional component and typescript:
// https://github.com/microsoft/TypeScript/issues/27425#issuecomment-473848082
export type FixDefaults<T extends React.FC<any>, D extends Partial<React.ComponentProps<T>>> = Pick<
  T,
  Exclude<keyof T, 'defaultProps'>
> &
  (T extends (...a: infer A) => infer R ? (...a: A) => R : never) & { defaultProps: D };
