import * as bycrpt from 'bcrypt';

export function hash(password: string, salt: number = 10): Promise<string> {
  return bycrpt.hash(password, salt);
}
