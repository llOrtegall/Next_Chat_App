import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './db/schema';
import { eq } from 'drizzle-orm';
import 'dotenv/config';
  
const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: false
  }
});

export const createNewUser = async (name: string, username: string, email: string) => {

  if (!name || !username || !email) {
    throw new Error('Name, username, and email are required');
  }

  const existingUser = await db.select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1)
    .then(users => users[0]);

  if (existingUser) {
    return existingUser;
  }

  const newUser: typeof usersTable.$inferInsert = {
    name,
    username,
    email,
  };

  await db.insert(usersTable).values(newUser);

  return newUser;
}
