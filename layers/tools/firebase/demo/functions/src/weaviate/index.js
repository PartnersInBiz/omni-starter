// import Chain from 'stream-chain'
// import parser from 'stream-json'
// import StreamArray from 'stream-json/streamers/StreamArray'
import { v4 as uuidv4 } from 'uuid'
import weaviate, { ApiKey } from 'weaviate-ts-client'

const client = weaviate.client({
  scheme: 'https',
  host: 'omni-software-dev-phgdbai3.weaviate.network',
  apiKey: new ApiKey('3zAAVEgwSkUrdV37yVHyHfXZaiJ6tlvX0MC6'),
})

const createObject = async (className, properties, id) => {
  if (!id) id = uuidv4()

  properties.thisPropShouldNotEndUpInTheSchema = -1

  let result = null
  try {
    result = await client.data
      .creator()
      .withClassName(className)
      .withProperties(properties)
      .withVector(Array(1536).fill(0.12345))
      .withId(id)
      .do()
    console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    // "invalid object: no such prop with name 'thisPropShouldNotEndUpInTheSchema' found..."
    console.error(
      'Expecting error about thisPropShouldNotEndUpInTheSchema:',
      e.message,
    )
  }
  return result
}

const createBatchImport = async (className, objects) => {
  let batcherId = client.batch.objectsBatcher()
  for (const dataObj of objects)
    batcherId = batcherId.withObject({
      class: className,
      properties: dataObj,
      id: dataObj.id || uuidv4(),
      vector: Array(1536).fill(0.12345),
    })

  // Flush
  const result = await batcherId.do()
  return result
}

// const streamImport = async (className) => {
//   let batcher = client.batch.objectsBatcher()
//   let counter = 0
//   const batchSize = 20

//   async function addObject(obj) {
//     const properties = {
//       question: obj['Question'],
//       answer: obj['Answer'],
//     }
//     // Add the object to the batch queue
//     batcher = batcher.withObject({
//       class: 'JeopardyQuestion',
//       properties,
//       // If you Bring Your Own Vectors, add the `vector` parameter here
//       // vector: JSON.parse(obj['Vector']),
//     })
//     counter++

//     // When the batch counter reaches batchSize, push the objects to Weaviate
//     if (counter % batchSize === 0) {
//       // Flush the batch queue and restart it
//       const response = await batcher.do()
//       batcher = client.batch.objectsBatcher()

//       // Handle errors
//       for (const r of response) if (r.result.errors) throw r.result.errors

//       console.log(`Imported ${counter} articles...`)
//     }
//   }
//   async function importJson(filePath) {
//     const pipeline = new Chain([
//       fs.createReadStream(filePath),
//       parser(),
//       new StreamArray(),
//     ])

//     for await (const { value } of pipeline) {
//       await addObject(value)
//     }
//   }

//   await importJson('jeopardy_1k.json')

//   // Flush any remaining objects
//   if (batcher.payload().objects.length > 0) await batcher.do()

//   console.log(`Finished importing ${counter} articles.`)
// }

const readObjectById = async (className, id) => {
  const result = await client.data
    .getterById()
    .withClassName(className)
    .withId(id)
    .do()
  console.log(JSON.stringify(result, null, 2))
  return result
}

const readObjectByIdWithVector = async (className, id) => {
  const result = await client.data
    .getterById()
    .withClassName(className)
    .withId(id)
    .withVector()
    .do()
  console.log(JSON.stringify(result, null, 2))
  return result
}
const readAllObjects = async (className) => {
  // STEP 1 - Prepare a helper function to iterate through data in batches
  async function getBatchWithCursor(collectionName, batchSize, cursor) {
    const query = client.graphql
      .get()
      .withClassName(collectionName)
      .withFields('title description _additional { id vector }')
      .withLimit(batchSize)

    if (cursor) {
      const result = await query.withAfter(cursor).do()
      return result.data.Get[collectionName]
    } else {
      const result = await query.do()
      return result.data.Get[collectionName]
    }
  }

  // STEP 2 - Iterate through the data
  let cursor = null

  while (true) {
    // Request the next batch of objects
    const nextBatch = await getBatchWithCursor('CollectionName', 100, cursor)

    // Break the loop if empty – we are done
    if (nextBatch.length === 0) break

    // Here is your next batch of objects
    console.log(JSON.stringify(nextBatch))

    // Move the cursor to the last returned uuid
    cursor = nextBatch.at(-1)['_additional']['id']
  }
}

const updateObject = async (className, id, properties) => {
  const result = await client.data
    .updater()
    .withClassName(className)
    .withId(id)
    .withProperties(properties)
    .do()
  console.log(JSON.stringify(result, null, 2))
  return result
}

const replaceObject = async (className, id, properties) => {
  const result = await client.data
    .updater()
    .withClassName(className)
    .withId(id)
    .withProperties(properties)
    .do()
  console.log(JSON.stringify(result, null, 2))
  return result
}

const deleteObject = async (className, id) => {
  const result = await client.data
    .deleter()
    .withClassName(className)
    .withId(id)
    .do()
  console.log(JSON.stringify(result, null, 2))
  return result
}

const deleteMultipleObjects = async (className, path, operator, valueText) => {
  const result = await client.batch
    .objectsBatchDeleter()
    .withClassName(className)
    .withWhere({
      path: [path],
      operator: operator,
      valueText: valueText,
    })
    .do()
  console.log(JSON.stringify(result, null, 2))
  return result
}

const createClass = async (className, properties) => {
  console.log('createClass', className)
  const classWithProps = {
    class: className,
    vectorizer: 'text2vec-openai',
    vectorIndexConfig: {
      distance: 'cosine',
    },
    // replicationConfig: {
    //   factor: 3,
    // },
    shardingConfig: {
      virtual_per_physical: 128,
      desired_count: 1,
      actual_count: 1,
      desired_virtual_count: 128,
      actual_virtual_count: 128,
    },
  }

  if (properties) classWithProps.properties = properties
  console.log('createClass with Props', classWithProps)

  // Add the class to the schema
  const result = await client.schema
    .classCreator()
    .withClass(classWithProps)
    .do()
  console.log('createClass', result)
  // The returned value is the full class definition, showing all defaults
  // console.log(JSON.stringify(result, null, 2))
  return result
}

export {
  client,
  createBatchImport,
  createClass,
  createObject,
  deleteMultipleObjects,
  deleteObject,
  readAllObjects,
  readObjectById,
  readObjectByIdWithVector,
  replaceObject,
  // streamImport,
  updateObject,
}
