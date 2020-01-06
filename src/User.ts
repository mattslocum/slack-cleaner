import { WebClient } from '@slack/web-api';
import { web } from './web';

export class User {

    private web: WebClient = web;

    async getUser(): Promise<string> {
        return (await this.web.auth.test()).user as string;
    }
}
