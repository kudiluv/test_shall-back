import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Readable } from 'stream';

@Injectable()
export class FormaterService {
  async htmlToPdf(url: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });
      const pdf = await page.pdf({ format: 'a4' });
      await browser.close();
      return Readable.from(pdf);
    } catch {
      await browser.close();
    }
  }
}
