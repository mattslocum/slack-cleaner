const program = require('commander');
import { generateWebClient } from './src/web';
import { User } from './src/User';
import { Conversations } from './src/Conversations';

program
    .description(`This is a tool to clean up slack channels.`)
    // required
    .option('--channel [channel]', `Private slack channel to delete from.`) // TODO: support either private or public.
    .option('--slack_token [token]', `Slack auth token`)
    // optional
    .option('--apply', `Apply the changes.`)
    .option('--keep_days [days]', `Number of fresh days to keep.`, '7')
    .parse(process.argv);

if (!program.channel || !program.slack_token) {
    program.help();
}

generateWebClient(program.slack_token);


(async () => {

    const user = new User();

    // Find your user id
    const userName = await user.getUser();
    console.log(`Logged in as: ${userName}`);

    const conversations = new Conversations();

    const channelId = await conversations.getPrivateChannelId(program.channel);

    const messages = await conversations.getMessages(channelId, program.keep_days);
    messages.reverse(); // make oldest first

    messages.forEach(async message => {
        if (message.replies) {
            if (program.apply) {
                message.replies.forEach(async reply => await conversations.deleteMessage(channelId, reply.ts));
            } else {
                message.replies.forEach(reply => console.log(`[dry mode] delete reply: ${message.text}`));
            }
        }
        try {
            if (program.apply) {
                await conversations.deleteMessage(channelId, message.ts);
                console.log(`deleted: ${message.text}`);
            } else {
                console.log(`[dry mode] delete message: ${message.text}`);
            }
        } catch (e) {
            if (e.data.error == "message_not_found") {
                // do nothing. It is already deleted.
            } else {
                throw e;
            }
        }
    });

    if (!program.apply) {
        console.log(`Ran in [dry mode]. use '--apply' to apply changes.`);
    }
})();
