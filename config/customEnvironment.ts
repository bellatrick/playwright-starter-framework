import dotenv from 'dotenv';import path from 'path';

export interface AppConfig {
  appEnv: string;
  baseURL: string;
  apiBaseUrl: string;
  testUser: {
    username?: string;
    password?: string;
  };
}

const envSuffix =
  process.env.NODE_ENV === 'staging' ? 'staging' : 'development';

  const envPath= path.resolve(process.cwd(), `.env.${envSuffix}`);

  const DUMP= dotenv.config({ path: envPath });

  if(DUMP.error){
    console.warn(`Warning: could not load .env.${envSuffix} file. Using default or system environment variables`);
  }

  const config:AppConfig={
    appEnv:process.env.APP_ENV || 'development',
    baseURL:process.env.BASE_URL || 'https://the-internet.herokuapp.com',
    apiBaseUrl:process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    testUser: {
      username:process.env.TEST_USER_USERNAME,
      password:process.env.TEST_USER_PASSWORD
    }

  }
  if(!config.baseURL){
    throw new Error('Missing BASE_URL environment variable');
  }
  if(!config.apiBaseUrl){
    throw new Error('Missing API_BASE_URL environment variable');
  }

  export default
   Object.freeze(config);

