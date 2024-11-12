import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { TtsService } from './tts.service';

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post()
  async generateSpeech(
    @Body() body: { model: string; input: string; voice: string; response_format: string; speed: number },
    @Req() request: Request
  ) {
    const { model, input, voice, response_format, speed } = body;
    const audioUrl = await this.ttsService.generateSpeech(model, input, voice, response_format, speed, request);
    return { audioUrl };
  }
}
