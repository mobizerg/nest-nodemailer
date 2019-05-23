import { upperCase } from 'lodash';

export function getTransportToken(name?: string): string {
  return name ? `NODEMAILER_TRANSPORT_${upperCase(name)}` : 'NODEMAILER_TRANSPORT_DEFAULT';
}