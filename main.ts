import { User } from './src/User';
import { Conversations } from './src/Conversations';
import minimist = require('minimist');

(async () => {
    let argv = minimist(process.argv.slice(2));
    if (!argv.channel) {
        throw "--channel param required";
    }

    const user = new User();

    // Find your user id
    const userName = await user.getUser();
    console.log(`Logged in as: ${userName}`);

    const conversations = new Conversations();

    const channelId = await conversations.getPrivateChannelId(argv.channel);

    const messages = await conversations.getMessages(channelId, 7);
    messages.reverse(); // make oldest first

    messages.forEach(async message => {
        if (message.replies) {
            message.replies.forEach(async reply => await conversations.deleteMessage(channelId, reply.ts));
        }
        try {
            await conversations.deleteMessage(channelId, message.ts);
        } catch (e) {
            if (e.data.error == "message_not_found") {
                // do nothing. It is already deleted.
            } else {
                throw e;
            }
        }

        console.log(`deleted: ${message.text}`);
    });
})();
