import { web } from './web';

export class User {

    async getUser(): Promise<string> {
        return (await web.auth.test()).user as string;
    }
}
