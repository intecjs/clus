import faker from '@faker-js/faker';
import data from 'emoji-mart/data/all.json';
import { BaseEmoji } from 'emoji-mart';

type User = {
  id: string;
  name: string;
};

const users = [...new Array(30)].map((_) => {
  return { id: faker.datatype.uuid(), name: faker.name.firstName() };
});

export type Event = {
  id: string;
  title: string;
  subTitle: string;
  description: string; // Markdown string
  date: string;
  end: string;
  reservedUsers: User[];
  capacity: number;
  imageUrl: string;
  emoji: BaseEmoji['id'];
};

const mdExample = `

  # h1
  This page supports markdown
  ${faker.lorem.paragraphs()}

  ## h2
  ${faker.lorem.paragraphs()}

  ### h3

  ${faker.lorem.paragraphs()}

  # bullets

  - ${faker.lorem.word()}
    - ${faker.lorem.words()}
      - ${faker.lorem.word()}
      - ${faker.lorem.words()}
  - ${faker.lorem.word()}
  - ${faker.lorem.words()}

  # code

  Here is some TypeScript code:

  ~~~tsx
  const EventCardWithLink: React.FC<{ event: Event }> = ({ event }) => {
    return (
      <Link href={'/events/' + event.id} passHref>
        <a>
          <EventCard {...event} />
        </a>
      </Link>
    );
  };
  ~~~

  # else

  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

  <a>https://reactjs.org</a>

  * Lists
  * [ ] todo
  * [x] done

  A table:

  | a | b |
  | - | - |

`;

const emojiIds = Object.keys(data.emojis);

export const events: Event[] = [
  {
    id: '1',
    title: 'NestJS meetup Online #2',
    subTitle: 'NestJSユーザーグループが運営する勉強会です！NestJSに興味がある方ならどなたでもご参加ください。',
    description: mdExample,
    date: faker.date.recent().toISOString(),
    end: faker.date.recent().toISOString(),
    reservedUsers: faker.random.arrayElements(users),
    capacity: 100,
    imageUrl: 'https://picsum.photos/id/237/350/200',
    emoji: 'apple',
  },
  {
    id: '2',
    title: 'ソフトウェアアーキテクチャの基礎 輪読会 #4',
    subTitle: '23時の深夜に開催！みなさんも是非ご参加ください。',
    description: faker.lorem.paragraphs().repeat(faker.datatype.number(10)),
    date: faker.date.recent().toISOString(),
    end: faker.date.recent().toISOString(),
    reservedUsers: faker.random.arrayElements(users),
    capacity: 50,
    imageUrl: `https://picsum.photos/id/211/150/100`,
    emoji: faker.random.arrayElement(emojiIds),
  },
  {
    id: '3',
    title: 'Serverless Meetup Japan Virtual #22',
    subTitle: 'serverless! serverless! serverless!!',
    description: faker.lorem.paragraphs().repeat(faker.datatype.number(10)),
    date: faker.date.recent().toISOString(),
    end: faker.date.recent().toISOString(),
    reservedUsers: faker.random.arrayElements(users),
    capacity: 30,
    imageUrl: `https://picsum.photos/id/12/150/100`,
    emoji: faker.random.arrayElement(emojiIds),
  },
  {
    id: '4',
    title: 'Serverless Meetup Japan Virtual #21',
    subTitle: 'serverless! serverless! serverless!!',
    description: faker.lorem.paragraphs().repeat(faker.datatype.number(10)),
    date: faker.date.recent().toISOString(),
    end: faker.date.recent().toISOString(),
    reservedUsers: faker.random.arrayElements(users),
    capacity: 20,
    imageUrl: `https://picsum.photos/id/56/150/100`,
    emoji: faker.random.arrayElement(emojiIds),
  },
  {
    id: '5',
    title: 'Serverless Meetup Japan Virtual #20',
    subTitle: 'serverless! serverless! serverless!!',
    description: faker.lorem.paragraphs().repeat(faker.datatype.number(10)),
    date: faker.date.recent().toISOString(),
    end: faker.date.recent().toISOString(),
    reservedUsers: faker.random.arrayElements(users),
    capacity: 100,
    imageUrl: `https://picsum.photos/id/99/150/100`,
    emoji: faker.random.arrayElement(emojiIds),
  },
  ...[...new Array(30)].map((_, i) => {
    return {
      id: i.toString(),
      title: faker.lorem.sentence(),
      subTitle: faker.lorem.sentence(),
      description: faker.lorem.paragraphs().repeat(faker.datatype.number(10)),
      date: faker.date.recent().toISOString(),
      end: faker.date.recent().toISOString(),
      reservedUsers: faker.random.arrayElements(users),
      capacity: 100,
      imageUrl: 'https://picsum.photos/150/100?random=' + faker.datatype.number(100),
      emoji: faker.random.arrayElement(emojiIds),
    };
  }),
];
