import faker from '@faker-js/faker';

export const feeds = [
  {
    id: faker.datatype.uuid(),
    votedUserAvatarUrl: faker.image.avatar(),
    votedUser: faker.name.firstName(),
    eventName: faker.lorem.sentence(),
  },
  ...[...new Array(10)].map((item) => {
    return {
      id: faker.datatype.uuid(),
      votedUserAvatarUrl: faker.image.avatar(),
      votedUser: faker.name.firstName(),
      eventName: faker.lorem.sentence(),
    };
  }),
];
