import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/mongodb-micro-payment"),
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
