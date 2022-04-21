// customer banner
export type Styles = {
  'contents': string;
  'hand': string;
  'main': string;
  'showMoreButton': string;
  'sideArea': string;
};

export type TheClasses = keyof Styles;

declare const styles: Styles;

export default styles;
