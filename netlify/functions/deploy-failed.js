const fetch = require("node-fetch");

exports.handler = () => {
  const giphyApiKey = process.env.GIPHY_API_KEY;
  const slackApiSecret = process.env.SLACK_API_SECRET;
  const channelID = process.env.SLACK_CHANNEL_ID;
  const userID = process.env.SLACK_USER_ID;

  return getGifAndNotifySlack(giphyApiKey, slackApiSecret, channelID, userID)
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    })
    .catch((e) => {
      return {
        statusCode: 500,
        body: JSON.stringify(e),
      };
    });
};

const getGifAndNotifySlack = async (
  giphyApiKey,
  slackApiSecret,
  channelID,
  userID
) => {
  const response = await fetch(
    `http://api.giphy.com/v1/gifs/random?tag=fail&api_key=${giphyApiKey}&limit=1`
  );
  const { data } = await response.json();

  return fetch(
    `https://hooks.slack.com/services/${userID}/${channelID}/${slackApiSecret}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: data.url,
      }),
    }
  );
};
