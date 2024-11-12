import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Request } from 'express';

@Injectable()
export class TtsService {
  private readonly logger = new Logger(TtsService.name);

  async generateSpeech(
    model: string,
    input: string,
    voice: string,
    response_format: string,
    speed: number,
    request: Request
  ): Promise<string> {
    this.logger.log(`Generating speech with model: ${model}, input: ${input}, voice: ${voice}`);

    try {
      // Simulate generating the audio data (replace this with actual speech generation logic)
      const audioData = Buffer.from('audio file data'); // Placeholder for actual audio content

      // Generate a unique file name based on timestamp or any other unique identifier
      const fileName = `audio_${Date.now()}.${response_format}`;

      // Define the correct output directory (outside the dist folder)
      const outputDir = path.join(__dirname, '..', 'output');
      
      // Ensure the output directory exists, create it if it doesn't
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const filePath = path.join(outputDir, fileName);

      // Save the audio file to the output directory
      fs.writeFileSync(filePath, audioData);

      // Get the base URL dynamically from the request's protocol and host
      const baseUrl = `${request.protocol}://${request.get('host')}`;

      // Log the base URL
      this.logger.log(`Base URL: ${baseUrl}`); // This will log the base URL

      // Construct the URL to access the audio file (using the /output/ route)
      const audioUrl = `${baseUrl}/output/${fileName}`;

      this.logger.log(`Speech generated successfully: ${audioUrl}`);
      return audioUrl; // Return the URL of the generated audio file
    } catch (error) {
      this.logger.error('Error in generating speech: ' + error.message);
      throw error; // Rethrow the error to be handled by the controller
    }
  }
}
