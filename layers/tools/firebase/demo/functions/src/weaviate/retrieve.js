import { WeaviateStore } from '@langchain/community/vectorstores/weaviate'
import { OpenAIEmbeddings } from '@langchain/openai'
import { Document } from 'langchain/document'
import { OpenAI } from 'langchain/llms/openai'
import { SelfQueryRetriever } from 'langchain/retrievers/self_query'
import { WeaviateTranslator } from 'langchain/retrievers/self_query/weaviate'
import weaviate, { ApiKey } from 'weaviate-ts-client'
import { runtimeConfig } from '../config/index.js'
export const createImage = async (event) => {
  /**
   * First, we create a bunch of documents. You can load your own documents here instead.
   * Each document has a pageContent and a metadata field. Make sure your metadata matches the AttributeInfo below.
   */
  const config = runtimeConfig()
  const docs = [
    new Document({
      pageContent:
        'A bunch of scientists bring back dinosaurs and mayhem breaks loose',
      metadata: { year: 1993, rating: 7.7, genre: 'science fiction' },
    }),
    new Document({
      pageContent:
        'Leo DiCaprio gets lost in a dream within a dream within a dream within a ...',
      metadata: { year: 2010, director: 'Christopher Nolan', rating: 8.2 },
    }),
    new Document({
      pageContent:
        'A psychologist / detective gets lost in a series of dreams within dreams within dreams and Inception reused the idea',
      metadata: { year: 2006, director: 'Satoshi Kon', rating: 8.6 },
    }),
    new Document({
      pageContent:
        'A bunch of normal-sized women are supremely wholesome and some men pine after them',
      metadata: { year: 2019, director: 'Greta Gerwig', rating: 8.3 },
    }),
    new Document({
      pageContent: 'Toys come alive and have a blast doing so',
      metadata: { year: 1995, genre: 'animated' },
    }),
    new Document({
      pageContent:
        'Three men walk into the Zone, three men walk out of the Zone',
      metadata: {
        year: 1979,
        director: 'Andrei Tarkovsky',
        genre: 'science fiction',
        rating: 9.9,
      },
    }),
  ]

  /**
   * Next, we define the attributes we want to be able to query on.
   * in this case, we want to be able to query on the genre, year, director, rating, and length of the movie.
   * We also provide a description of each attribute and the type of the attribute.
   * This is used to generate the query prompts.
   */
  const attributeInfo = [
    {
      name: 'genre',
      description: 'The genre of the movie',
      type: 'string or array of strings',
    },
    {
      name: 'year',
      description: 'The year the movie was released',
      type: 'number',
    },
    {
      name: 'director',
      description: 'The director of the movie',
      type: 'string',
    },
    {
      name: 'rating',
      description: 'The rating of the movie (1-10)',
      type: 'number',
    },
    {
      name: 'length',
      description: 'The length of the movie in minutes',
      type: 'number',
    },
  ]

  /**
   * Next, we instantiate a vector store. This is where we store the embeddings of the documents.
   */
  const embeddings = new OpenAIEmbeddings()
  const llm = new OpenAI()
  const documentContents = 'Brief summary of a movie'
  console.log('scheme', config.WEAVIATE.scheme)
  console.log('scheme', config.WEAVIATE.host)
  console.log('scheme', config.WEAVIATE.apiKey)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = weaviate.client({
    scheme: config.WEAVIATE.scheme,
    host: config.WEAVIATE.host, // Replace with your endpoint
    apiKey: new ApiKey(config.WEAVIATE.apiKey), // Replace w/ your Weaviate instance API key
    headers: { 'X-OpenAI-Api-Key': config.OPENAI.secret }, // Replace with your inference API key
  })

  const vectorStore = await WeaviateStore.fromDocuments(docs, embeddings, {
    client,
    indexName: 'Test',
    textKey: 'text',
    metadataKeys: ['year', 'director', 'rating', 'genre'],
  })
  const selfQueryRetriever = await SelfQueryRetriever.fromLLM({
    llm,
    vectorStore,
    documentContents,
    attributeInfo,
    /**
     * We need to use a translator that translates the queries into a
     * filter format that the vector store can understand. LangChain provides one here.
     */
    structuredQueryTranslator: new WeaviateTranslator(),
  })

  /**
   * Now we can query the vector store.
   * We can ask questions like "Which movies are less than 90 minutes?" or "Which movies are rated higher than 8.5?".
   * We can also ask questions like "Which movies are either comedy or drama and are less than 90 minutes?".
   * The retriever will automatically convert these questions into queries that can be used to retrieve documents.
   *
   * Note that unlike other vector stores, you have to make sure each metadata keys are actually presnt in the database,
   * meaning that Weaviate will throw an error if the self query chain generate a query with a metadata key that does
   * not exist in your Weaviate database.
   */
  const query1 = await selfQueryRetriever.getRelevantDocuments(
    'Which movies are rated higher than 8.5?',
  )
  const query2 = await selfQueryRetriever.getRelevantDocuments(
    'Which movies are directed by Greta Gerwig?',
  )
  console.log(query1, query2)

  return {
    statusCode: 200,
    body: {
      status: 'Ok',
      data: query1,
    },
  }
}
