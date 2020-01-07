import { web } from './web';

export class Conversations {
    private async getPrivateList(): Promise<any[]> {
        return (await web.conversations.list({
            exclude_archived: true,
            types: "private_channel", // can't get this to support both at once
        })).channels as any[];
    }

    async getPrivateChannelId(name: string): Promise<string> {
        const channels = await this.getPrivateList();
        return channels.find(ch => ch.name === name).id;
    }

    async getMessages(groupId: string, olderThanDays: number = 7): Promise<any[]> {
        return (await web.conversations.history({
            channel: groupId,
            latest: ((Date.now() / 1000) - olderThanDays * 24 * 60 * 60) + ''
        })).messages as any[];
    }

    async deleteMessage(groupId: string, ts: string) {
        return web.chat.delete({
            channel: groupId,
            ts
        });
    }
}
