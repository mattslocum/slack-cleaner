import { WebClient } from '@slack/web-api';

export let web;

export function generateWebClient(slack_token: string) {
    web = new WebClient(slack_token);
}
