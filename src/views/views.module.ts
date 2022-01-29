import { DynamicModule, Module } from '@nestjs/common';
import { Config } from './config';
import { ViewsService } from './views.service';

@Module({})
export class ViewsModule {
  static config(config: Config): DynamicModule {
    return {
      module: ViewsModule,
      providers: [
        {
          provide: Config,
          useValue: config,
        },
        ViewsService,
      ],
      exports: [ViewsService],
    };
  }
}
