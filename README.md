<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A Nodemailer integration module for Nest.js framework.
</p>

### Installation

**Yarn**
```bash
yarn add @mobizerg/nest-nodemailer nodemailer
yarn add @types/nodemailer --dev
```

**NPM**
```bash
npm install @mobizerg/nest-nodemailer nodemailer --save
npm install @types/nodemailer --save-dev
```

### Description
Mail integration module for [Nest.js](https://github.com/nestjs/nest) based on the [Nodemailer](https://nodemailer.com) package.

### Usage

Import the **NodemailerModule** in `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { NodemailerModule } from '@mobizerg/nest-nodemailer';

@Module({
    imports: [
        NodemailerModule.register(options);
    ],
})
export class AppModule {}
```
With Async
```typescript
import { Module } from '@nestjs/common';
import { NodemailerModule } from '@mobizerg/nest-nodemailer';

@Module({
    imports: [
        NodemailerModule.registerAsync({
            imports: [ConfigModule],
            useExisting: NodemailerConfigService,
        }),
    ],
})
export class AppModule {}
```

Example config file (async)
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { NodemailerModuleOptions, NodemailerOptionsFactory } from '@mobizerg/nest-nodemailer';

@Injectable()
export class NodemailerConfigService implements NodemailerOptionsFactory {

  constructor(private readonly config: ConfigService) {}

  createNodemailerOptions(name?: string): NodemailerModuleOptions {
      
    return {
      name,
      transport: {
        host: this.config.mailHost,
        port: this.config.mailPort,
        secure: this.config.mailIsSecure,
        auth: {
          user: this.config.mailUsername,
          pass: this.config.mailPassword,
        },
        pool: true,
      },
      defaults: {
        pool: true,
        maxConnections: 2,
        from: `${this.config.mailFromName} <${this.config.mailFromAddress}>`,
      },
    };
  }
}
```

Importing inside services
```typescript
import { Injectable } from '@nestjs/common';
import { InjectTransport } from '@mobizerg/nest-nodemailer';
import { SentMessageInfo } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
    
      constructor(@InjectTransport()
                  private readonly mailTransport: Mail) {}
                  
      async send(): Promise<SentMessageInfo> {
          return await this.mailTransport.sendMail(options);
      }           
}
```

### License

MIT
