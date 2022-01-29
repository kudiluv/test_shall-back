import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { FormaterService } from 'src/formater/formater.service';
import { ViewsService } from 'src/views/views.service';
import { CreateResultDto } from './dto/create.result.dto';
import { ResultsService } from './results.service';
import { Request, Response } from 'express';
import * as mime from 'mime';

@Controller('results')
export class ResultsController {
  constructor(
    private resultsService: ResultsService,
    private viewsService: ViewsService,
    private formaterService: FormaterService,
  ) {}

  @Post()
  save(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.save(createResultDto);
  }
  @Get('/:id')
  async getStatistic(@Param('id') id: string) {
    const data = await this.resultsService.getStatistics(id);
    return this.viewsService.getHTML('statistics', data);
  }
  @Get('/:id/pdf')
  async getStatisticPdf(
    @Req() request: Request,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const pdf = await this.formaterService.htmlToPdf(
      process.env.HOST + 'results/' + id,
    );
    res.setHeader('Content-Type', mime.lookup('pdf'));
    pdf.pipe(res);
  }
}
