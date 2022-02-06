import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import * as fs from 'fs';
import { Config } from './config';

@Injectable()
export class ViewsService {
  handlebars = Handlebars;
  constructor(private config: Config) {
    this.handlebars.registerHelper('json', function (context) {
      return JSON.stringify(context);
    });
    this.handlebars.registerHelper('ifCond', function (v1, v2, options) {
      if (v1 == v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    });
    this.handlebars.registerHelper('inc', function (value, options) {
      return parseInt(value) + 1;
    });
  }

  getHTML(templateName: string, data: any) {
    return this.getTemplate(templateName)(data);
  }

  getTemplate(name: string) {
    const template = Handlebars.compile(
      fs.readFileSync(this.findTemplate(name)).toString(),
    );
    return template;
  }

  private findTemplate(name: string) {
    const path = fs
      .readdirSync(this.config.path)
      .filter((fn) => fn.includes(`${name}.hbs`))[0];
    if (!path) {
      throw Error('Template not found');
    }
    return this.config.path + path;
  }
}
