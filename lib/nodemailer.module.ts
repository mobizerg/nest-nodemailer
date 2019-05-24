import {DynamicModule, Inject, Module, Provider} from '@nestjs/common';
import {NodemailerModuleAsyncOptions, NodemailerModuleOptions, NodemailerOptionsFactory} from './interfaces';
import {createNodemailerTransport} from './nodemailer-transport.provider';
import {NODEMAILER_MODULE_OPTIONS} from './nodemailer.constant';
import {getTransportToken} from './nodemailer.helper';

@Module({})
export class NodemailerModule {

  constructor(@Inject(NODEMAILER_MODULE_OPTIONS)
              private readonly options: NodemailerModuleOptions) {}

  static register(options: NodemailerModuleOptions): DynamicModule {
    return {
      module: NodemailerModule,
      providers: [
        createNodemailerTransport(options.name),
        { provide: NODEMAILER_MODULE_OPTIONS, useValue: options },
      ],
      exports: [getTransportToken(options.name)],
    };
  }

  static registerAsync(options: NodemailerModuleAsyncOptions): DynamicModule {
    return {
      module: NodemailerModule,
      imports: options.imports || [],
      providers: [
        createNodemailerTransport(options.name),
        ...this.createAsyncProviders(options),
      ],
      exports: [getTransportToken(options.name)],
    };
  }

  private static createAsyncProviders(options: NodemailerModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  private static createAsyncOptionsProvider(options: NodemailerModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: NODEMAILER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: NODEMAILER_MODULE_OPTIONS,
      useFactory: async (optionsFactory: NodemailerOptionsFactory) => await optionsFactory.createNodemailerOptions(options.name),
      inject: [options.useExisting || options.useClass],
    };
  }

  // async onModuleDestroy() {
  //   const transport = this.moduleRef.get<Mail>(getTransportToken(this.options.name));
  //   transport && transport.close();
  // }
}
