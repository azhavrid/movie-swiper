/* ------------- Other ------------- */
export type ValuesOf<T> = T[keyof T];

// Correct props type for React components with default props
export type WithDefaultProps<Props, DefaultProps> = Partial<DefaultProps> & Omit<Props, keyof DefaultProps>;
