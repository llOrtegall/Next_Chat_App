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

export const updateUsername = async (email: string, newUsername: string) => {
  if (!email || !newUsername) {
    throw new Error('Email and new username are required');
  }

  const user = await db.select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1)
    .then(users => users[0]);

  if (!user) {
    throw new Error('User not found');
  }

  try {
    const result = await db.update(usersTable)
      .set({ username: newUsername })
      .where(eq(usersTable.email, email));

    if(result.rowCount !== 1) {
      throw new Error('Failed to update username');
    }

    console.log('Username updated successfully:', { email, newUsername });
  } catch (error) {
    console.error('Error updating username:', error);
  }
}