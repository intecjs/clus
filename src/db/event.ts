import faker from '@faker-js/faker';
import { Emoji, emojis } from './emoji';

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  userCount: number;
  imageUrl: string;
  emoji: Emoji;
};

export const events: Event[] = [
  {
    id: '1',
    title: 'NestJS meetup Online #2',
    description: 'この勉強会ではXXXを行っています。',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=1',
    emoji: '🍎',
  },
  {
    id: '2',
    title: 'ソフトウェアアーキテクチャの基礎 輪読会 #4',
    description: '23時の深夜に開催！みなさんも是非ご参加ください。',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=2',
    emoji: faker.random.arrayElement(emojis),
  },
  {
    id: '3',
    title: 'Serverless Meetup Japan Virtual #22',
    description: 'serverless! serverless! serverless!!',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=3',
    emoji: faker.random.arrayElement(emojis),
  },
  {
    id: '4',
    title: 'Serverless Meetup Japan Virtual #21',
    description: 'serverless! serverless! serverless!!',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=4',
    emoji: faker.random.arrayElement(emojis),
  },
  {
    id: '5',
    title: 'Serverless Meetup Japan Virtual #20',
    description: 'serverless! serverless! serverless!!',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=5',
    emoji: faker.random.arrayElement(emojis),
  },
  ...[...new Array(30)].map((_, i) => {
    return {
      id: i.toString(),
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      date: faker.date.recent().toISOString(),
      userCount: faker.datatype.number(100),
      imageUrl: 'https://picsum.photos/150/100?random=' + faker.datatype.number(100),
      emoji: faker.random.arrayElement(emojis),
    };
  }),
];
