// customer banner
export type Styles = {
  'action': string;
  'active': string;
  'menu': string;
  'profile': string;
};

export type TheClasses = keyof Styles;

declare const styles: Styles;

export default styles;
