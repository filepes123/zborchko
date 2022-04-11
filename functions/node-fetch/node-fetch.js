const fetch = require('node-fetch')

const handler = async function () {
  try {
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: "Bearer " + process.env.REACT_TWITTER_KEY
      }
    };
    const response = await fetch('https://api.twitter.com/2/users/1648317175/tweets', config)
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
