import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
 
  const app = await NestFactory.create(AppModule,{cors:true});
  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: '*',
  //   credentials: true,
  //   methods:['GET', 'POST', 'PUT', 'DELETE']
  // });
  const config = new DocumentBuilder()
  .setTitle('Final-Project')
  .setDescription('The Final API')
  .setVersion('1.0')
  .addTag('Final')
  .build()

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document)
 

  await app.listen(3000);
}
bootstrap();
