import { Inject } from '@nestjs/common';
import { getTransportToken } from './nodemailer.helper';

export function InjectTransport(name?: string): ParameterDecorator {
  return Inject(getTransportToken(name));
}