import weaviate, { ApiKey } from 'weaviate-ts-client'
import { runtimeConfig } from '../config/index.js'

export const deleteWeaviate = async (id, indexName) => {
  const config = runtimeConfig()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = weaviate.client({
    scheme: config.WEAVIATE.scheme,
    host: config.WEAVIATE.host, // Replace with your endpoint
    apiKey: new ApiKey(config.WEAVIATE.apiKey), // Replace w/ your Weaviate instance API key
    headers: { 'X-OpenAI-Api-Key': config.OPENAI.secret }, // Replace with your inference API key
  })

  return client.data
}
