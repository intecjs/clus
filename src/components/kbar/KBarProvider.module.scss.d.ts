// customer banner
export type Styles = {
  'icon': string;
  'kbarAnimator': string;
  'kbarResults': string;
  'kbarResultsActive': string;
  'kbarSearch': string;
  'left': string;
  'positioner': string;
  'results': string;
  'right': string;
  'section': string;
};

export type TheClasses = keyof Styles;

declare const styles: Styles;

export default styles;
