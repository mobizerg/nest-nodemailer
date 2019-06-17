export function getTransportToken(name?: string): string {
  return name ? `NODEMAILER_TRANSPORT_${name.toUpperCase()}` : 'NODEMAILER_TRANSPORT_DEFAULT';
}
