// customer banner
export type Styles = {
  'card': string;
  'container': string;
  'date': string;
  'description': string;
  'img': string;
  'users': string;
};

export type TheClasses = keyof Styles;

declare const styles: Styles;

export default styles;
