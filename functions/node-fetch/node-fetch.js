const fetch = require('node-fetch')

const handler = async function () {
  try {
    const response = await fetch('https://api.twitter.com/2/users/1648317175/tweets', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${process.env.REACT_TWITTER_KEY}`
    },
    })
    if (response.status === 403) {
      console.log(response);
    }
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
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
