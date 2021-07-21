const fetch = require("node-fetch");

exports.handler = async () => {
  const giphyApiKey = process.env.GIPHY_API_KEY;
  const slackApiSecret = process.env.SLAKC_API_SECRET;
  const channelID = process.env.SLACK_CHANNEL_ID;
  const userID = process.env.SLACK_USER_ID;

  const response = await fetch(
    `http://api.giphy.com/v1/gifs/search?q=fail&api_key=${giphyApiKey}&limit=1`
  );
  const { data } = await response.json();

  const sendGifToSlack = () => {
    fetch(
      `https://hooks.slack.com/services/${userID}/${channelID}/${slackApiSecret}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          text: data[0].url,
        }),
      }
    );
  };

  sendGifToSlack();

  return {
    statusCode: 200,
    body: JSON.stringify({ gifUrl: data[0].embed_url }),
  };
};
