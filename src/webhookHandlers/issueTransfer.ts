import IssueTransfer from '../types/Webhook/IssueTransfer';
import sendHook from '../utils/sendHook';
import WebhookRequest from '../types/Discord/WebhookRequest';

const sendDiscordMessage = (webhook: IssueTransfer) => {
  const message: WebhookRequest = {
    username: 'Zenhub',
    embeds: [
      {
        title: '#' + webhook.issue_number + ' : ' + webhook.issue_title,
        description: 'Moved from "' + webhook.from_pipeline_name + '" to "' + webhook.to_pipeline_name + '"',
        url: webhook.github_url,
        color: 0x00d090, 
        author: {
          name: webhook.user_name,
          icon_url: 'https://avatars.githubusercontent.com/' + webhook.user_name,
        },
        footer: {
          text: webhook.organization + '/' + webhook.repo,
        },
      },
    ],
  };

  return sendHook(message);
};

export default sendDiscordMessage;
