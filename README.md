# Slack cleaner
Ability to delete all messages from a given private channel. This is a great tool for code-review channel or any other queue/list style channel.

By default it keeps the latest 7 days of messages. This is configurable using --keep_days flag.

## Setup
### Code
- Clone this repo
- Run: `npm install`

### Setup Slack oAuth token
- Go to https://api.slack.com/apps/new
- Make a new app
- Navigate to “OAuth & Permissions”
- Add the following scopes:
  - channels:history
  - channels:read
  - channels:write
  - groups:history
  - groups:read
  - groups:write
- Click "reinstall your app" button
- Copy your OAuth Access Token

## Run
Run `npm start` for list of options. 

By default it run is 'dry run' mode. To make it run, use `--apply` flag.

example:
`npm start -- --channel=xmen-code-reviews --slack_token=<OAuth Access Token>`
