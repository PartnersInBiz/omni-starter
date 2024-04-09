import { WeaviateStore } from '@langchain/community/vectorstores/weaviate'
import { OpenAIEmbeddings } from '@langchain/openai'
import weaviate, { ApiKey } from 'weaviate-ts-client'
import { runtimeConfig } from '../config/index.js'

export const updateWeaviate = async (
  docs,
  attributeInfo,
  indexName,
  textKey = 'text',
) => {
  /**
   * First, we create a bunch of documents. You can load your own documents here instead.
   * Each document has a pageContent and a metadata field. Make sure your metadata matches the AttributeInfo below.
   */
  const config = runtimeConfig()

  const metadataKeys = attributeInfo.map((info) => info.name)

  /**
   * Next, we instantiate a vector store. This is where we store the embeddings of the documents.
   */
  const embeddings = new OpenAIEmbeddings()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = weaviate.client({
    scheme: config.WEAVIATE.scheme,
    host: config.WEAVIATE.host, // Replace with your endpoint
    apiKey: new ApiKey(config.WEAVIATE.apiKey), // Replace w/ your Weaviate instance API key
    headers: { 'X-OpenAI-Api-Key': config.OPENAI.secret }, // Replace with your inference API key
  })

  return await WeaviateStore.fromDocuments(docs, embeddings, {
    client,
    indexName: indexName,
    textKey: textKey,
    metadataKeys: metadataKeys,
  })
    .then((store) => {
      return {
        statusCode: 200,
        body: {
          status: 'Ok',
          data: store,
        },
      }
    })
    .catch((err) => {
      return {
        statusCode: 500,
        body: {
          status: 'Error',
          message: err,
        },
      }
    })
}
