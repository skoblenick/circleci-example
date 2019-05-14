const elasticsearch = require('elasticsearch')

// Core ES variables for this project
const index = 'library'
const type = 'novel'
const port = 9200
const host = process.env.ES_HOST || 'localhost'
const client = new elasticsearch.Client({ host: { host, port } })

/** Check the ES connection status */
async function checkConnection () {
  let isConnected = false
  while (!isConnected) {
    try {
      const health = await client.cluster.health({})
      isConnected = true
      return health;
    } catch (err) {
      console.log('Connection Failed, Retrying...', err)
    }
  }
}

module.exports = checkConnection;