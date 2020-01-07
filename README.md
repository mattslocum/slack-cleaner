# Slack utility
Ability to delete all messages from a given channel

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

example:
`npm start -- --channel=xmen-code-reviews --slack_token=<OAuth Access Token>`
