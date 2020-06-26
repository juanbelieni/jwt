import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';

interface User {
  id: number;
  name: string;
  email: string;
}

export const genAccessToken = (user: User) => {
  const { id, name, email } = user;
  const tokenPayload = { id, name, email };

  const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
  return accessToken;
};

export const verifyAccessToken = (accessToken: string) => {
  const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY) as User;
  return tokenPayload;
};
