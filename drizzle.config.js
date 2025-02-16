/** @type {import("drizzle-kit").Config} */
const config = {
      schema: './utils/schema.js',
      dialect: 'postgresql',
      dbCredentials: {
          url: 'postgresql://accounts:npg_IQHlDWqX0fg5@ep-steep-sunset-a525u1mf-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
      },
  };
  
  export default config;
  