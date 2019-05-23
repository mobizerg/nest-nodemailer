import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Options } from 'nodemailer/lib/smtp-pool';

export interface NodemailerModuleOptions {
  name?: string;
  transport: Options;
  defaults?: Options;
}

export interface NodemailerOptionsFactory {
  createNodemailerOptions(name?: string): Promise<NodemailerModuleOptions> | NodemailerModuleOptions;
}

export interface NodemailerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<NodemailerOptionsFactory>;
  useClass?: Type<NodemailerOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<NodemailerModuleOptions> | NodemailerModuleOptions;
  inject?: any[];
}
