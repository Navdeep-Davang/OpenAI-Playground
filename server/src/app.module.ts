import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TtsService } from './tts/tts.service';
import { TtsController } from './tts/tts.controller';
import { TtsModule } from './tts/tts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TtsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist', 'output'), // Path to the dist/output directory
      serveRoot: '/output/', // URL prefix to serve static files
    }),
  ],
  controllers: [AppController, TtsController],
  providers: [AppService, TtsService],
})
export class AppModule {}
