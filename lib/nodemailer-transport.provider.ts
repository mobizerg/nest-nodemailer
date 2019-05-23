import { FactoryProvider } from '@nestjs/common/interfaces';
import { createTransport } from 'nodemailer';
import { NodemailerModuleOptions } from './interfaces';
import { NODEMAILER_MODULE_OPTIONS } from './nodemailer.constant';
import { getTransportToken } from './nodemailer.helper';

export const createNodemailerTransport: (name?: string) => FactoryProvider = (name?: string) => ({
  provide: getTransportToken(name),
  useFactory: (options: NodemailerModuleOptions) => {
    return createTransport(options.transport, options.defaults);
  },
  inject: [NODEMAILER_MODULE_OPTIONS],
});
