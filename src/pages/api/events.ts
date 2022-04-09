import type { NextApiRequest, NextApiResponse } from 'next';
import { events } from 'src/db/event';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(events);
};
