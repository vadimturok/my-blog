import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as firebaseAdmin from 'firebase-admin'
import * as serviceAccount from '../post-images-storage-firebase-adminsdk-7r152-efa03de64d.json'


export const admin = firebaseAdmin.initializeApp({
  // @ts-ignore
  credential: firebaseAdmin.credential.cert(serviceAccount)
})
export const storageRef = admin.storage().bucket('gs://post-images-storage.appspot.com')

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({credentials: true, origin: process.env.CLIENT_URL});

  await app.listen(PORT, () => console.log(`Server running om port: ${PORT}`));
}
bootstrap();
