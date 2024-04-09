import { WeaviateStore } from '@langchain/community/vectorstores/weaviate'
import { OpenAIEmbeddings } from '@langchain/openai'
import weaviate, { ApiKey } from 'weaviate-ts-client'

export const useWeaviateLangchain = () => {
  const config = useRuntimeConfig()
  const test = process.env.NODE_ENV === 'development'
  const weaviateConfig: any = test
    ? config.public.WEAVIATE_TEST
    : config.public.WEAVIATE

  const client = weaviate.client({
    scheme: weaviateConfig.scheme,
    host: weaviateConfig.host, // Replace with your endpoint
    apiKey: new ApiKey(weaviateConfig.apiKey), // Replace w/ your Weaviate instance API key
    headers: { 'X-OpenAI-Api-Key': config.public.OPENAI.secret }, // Replace with your inference API key
  })

  const embeddings = new OpenAIEmbeddings()

  const createWeaviateClass = async (
    docs: any[],
    attributeInfo: any,
    indexName: string,
    textKey = 'text',
  ) => {
    const metadataKeys = attributeInfo.map((info: { name: any }) => info.name)

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

  return {
    createWeaviateClass,
  }
}
