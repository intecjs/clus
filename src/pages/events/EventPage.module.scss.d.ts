// customer banner
export type Styles = {
  'aside': string;
  'button': string;
  'capacity': string;
  'card': string;
  'container': string;
  'description': string;
  'emojiContainer': string;
  'emojiPicker': string;
  'eventDate': string;
  'eventImage': string;
  'eventPageThemeEmoji': string;
  'followButton': string;
  'header': string;
  'main': string;
  'name': string;
  'owner': string;
  'page': string;
  'reservedUsers': string;
  'titleContainer': string;
  'userEmoji': string;
  'users': string;
};

export type TheClasses = keyof Styles;

declare const styles: Styles;

export default styles;
