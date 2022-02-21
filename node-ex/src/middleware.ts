import * as express from 'express';
import * as typeORM from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const getOrCreateConnection = async (args: PostgresConnectionOptions): Promise<void> => {
  try {
    await typeORM.createConnection(args);
  } catch (error) {
    typeORM.getConnection(args.name);
  }
};

export const dbConnectionMiddleware = async(request: express.Request, callback: express.Response, next) => {
  try {
    await getOrCreateConnection({
      name: 'defaut',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      type: 'postgres',
      synchronize: false,
      
    });
    next();
  } catch (error){
    return await callback.status(500).json({message: 'DB connection failed', error})
  }
}