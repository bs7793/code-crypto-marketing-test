const JWT_SECRET = process.env.JWT_SECRET;

export function getJwtSecretKey() {
  if (!JWT_SECRET || JWT_SECRET.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.');
  }

  return JWT_SECRET;
}