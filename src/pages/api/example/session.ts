// This is an example of how to access a session from an API route
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const token = await getToken({ req, secret });
  console.log('JSON Web Token', token);

  res.send(JSON.stringify(session, null, 2));
};
