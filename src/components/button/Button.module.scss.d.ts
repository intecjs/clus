// customer banner
export type Styles = {
  'button': string;
  'primary': string;
  'secondary': string;
};

export type TheClasses = keyof Styles;

declare const styles: Styles;

export default styles;
