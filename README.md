# Event-triggered Netlify Functions

[![Netlify Status](https://api.netlify.com/api/v1/badges/b52701dc-af05-4c69-a9d1-858aab2d3e74/deploy-status)](https://app.netlify.com/sites/event-triggered-function/deploys)

This is a small demo made with Vanilla JS :heart: to showcase how to use event-triggered Netlify Functions.

This site is deployed on Netlify and when a deploy fails, the function fetches a random gif and posts it on a Slack channel.

## Local development

If you'd like to try this demo locally, there's a few steps to follow:

- Follow the [Giphy API docs](https://developers.giphy.com/docs/api#quick-start-guide) to get an API key.
- Check the [Slack API docs](https://api.slack.com/) to create an app and get a user ID, channel ID and secret token.
- Clone the repo.
- In the `deploy-failed.js` file, replace the environment variables with your own:
  - Either replace directly the `process.env.SOME_KEY` instances with the keys you generated (but don't forget to **not** commit your file), or:
  - Create a `.env` file, place all your secrets in there and add `require('dotenv').path("path/to/your/.env/file")` at the top of the function file (and .gitignore it if you decide to commit).
- Run `netlify dev` in your terminal
- Open `http://localhost:8888`
- As this function is usually triggered by a build event, you'll need to write some custom code to trigger it locally, for example:

```javascript
window.onload = () => {
  return fetch("/.netlify/functions/deploy-failed");
};
```

And if you followed all the above steps, you should get a new Gif on Slack! :tada:

## Deploy on Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/charliegerard/event-triggered-netlify-function)

The fastest way to try this demo would be to deploy it on Netlify and add the following environment variables in the site's settings: `GIPHY_API_KEY`, `SLACK_API_SECRET`, `SLACK_CHANNEL_ID`, `SLACK_USER_ID`.

Trigger a deploy, cancel it, get a gif on Slack!
