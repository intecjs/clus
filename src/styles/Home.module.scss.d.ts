// customer banner
export type Styles = {
  'contents': string;
  'main': string;
  'sideArea': string;
};

export type TheClasses = keyof Styles;

declare const styles: Styles;

export default styles;
