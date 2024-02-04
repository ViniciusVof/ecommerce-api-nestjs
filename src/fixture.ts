import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepo = dataSource.getRepository('Product');
  await productRepo.insert([
    {
      id: '364ae37b-3dbe-4f66-8623-77b82e6257a0',
      name: 'Produto 2',
      description: 'Descrição do produto 2',
      image_url: 'https://via.placeholder.com/150',
      price: 100,
    },
    {
      id: '41d9a6da-1675-4426-82e2-436738bedd39',
      name: 'Produto 1',
      description: 'Descrição do produto 1',
      image_url: 'https://via.placeholder.com/150',
      price: 100,
    },
  ]);

  await app.close();
}
bootstrap();
