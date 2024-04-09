import { generateUuid5 } from 'weaviate-ts-client'

export const useWeaviateObjectImport = () => {
  const { weaviateApp } = useWeaviate()

  const ImportBasic = async () => {
    const className = 'YourName' // Replace with your class name
    const dataObjs: any = []
    for (let i = 1; i <= 5; i++) dataObjs.push({ title: `Object ${i}` }) // Replace with your actual objects

    let batcher5 = weaviateApp.batch.objectsBatcher()
    for (const dataObj of dataObjs)
      batcher5 = batcher5.withObject({
        class: className,
        properties: dataObj,
        // tenant: 'tenantA'  // If multi-tenancy is enabled, specify the tenant to which the object will be added.
      })

    // Flush
    await batcher5.do()
  }

  const ImportWithId = async () => {
    const className = 'YourName' // Replace with your class name
    const dataObjs: any = []
    for (let i = 1; i <= 5; i++) dataObjs.push({ title: `Object ${i}` }) // Replace with your actual objects

    let batcherId = weaviateApp.batch.objectsBatcher()
    for (const dataObj of dataObjs)
      batcherId = batcherId.withObject({
        class: className,
        properties: dataObj,
        id: generateUuid5(dataObj.title),
      })

    // Flush
    await batcherId.do()
  }

  const ImportWithVector = async () => {
    const className = 'YourName' // Replace with your class name
    const dataObjs: any = []
    const vectors = []
    for (let i = 1; i <= 5; i++) {
      dataObjs.push({ title: `Object ${i}` }) // Replace with your actual objects
      vectors.push(Array(10).fill(0.25 + i / 100)) // Replace with your actual vectors
    }

    let batcherVectors = weaviateApp.batch.objectsBatcher()
    for (let i = 0; i < 5; i++)
      batcherVectors = batcherVectors.withObject({
        class: className,
        properties: dataObjs[i],
        vector: vectors[i],
      })

    // Flush
    await batcherVectors.do()
  }

  const ImportWithNamedVector = async () => {
    const className = 'YourCollection' // Replace with your class name
    const dataObjs: any = []
    const title_vectors = []
    const body_vectors = []
    for (let i = 1; i <= 5; i++) {
      dataObjs.push({ title: `Object ${i}`, body: `Body ${i}` }) // Replace with your actual objects
      title_vectors.push(Array(10).fill(0.25 + i / 100)) // Replace with your actual vectors
      body_vectors.push(Array(10).fill(0.25 + i / 100)) // Replace with your actual vectors
    }

    let namedVectors = weaviateApp.batch.objectsBatcher()
    for (let i = 0; i < 5; i++)
      namedVectors = namedVectors.withObject({
        class: className,
        properties: dataObjs[i],
        vectors: {
          title: title_vectors[i],
          body: body_vectors[i],
        },
      })

    // Flush
    await namedVectors.do()
  }

  const ImportStream = async () => {
    let batcher: any = weaviateApp.batch.objectsBatcher()
    let counter = 0
    const batchSize = 20

    async function addObject(obj: any): Promise<void> {
      const properties = {
        question: obj['Question'],
        answer: obj['Answer'],
      }
      // Add the object to the batch queue
      batcher = batcher.withObject({
        class: 'JeopardyQuestion',
        properties,
        // If you Bring Your Own Vectors, add the `vector` parameter here
        // vector: JSON.parse(obj['Vector']),
      })
      counter++

      // When the batch counter reaches batchSize, push the objects to Weaviate
      if (counter % batchSize === 0) {
        // Flush the batch queue and restart it
        const response = await batcher.do()
        batcher = weaviateApp.batch.objectsBatcher()

        // Handle errors
        for (const r of response) if (r.result.errors) throw r.result.errors

        console.log(`Imported ${counter} articles...`)
      }
    }
    async function importJson(filePath: any) {
      // const pipeline = new Chain([
      // fs.createReadStream(filePath),
      // parser(),
      // new StreamArray(),
      // ])
      // for await (const { value } of pipeline) {
      //   await addObject(value)
      // }
    }

    await importJson('jeopardy_1k.json')

    // Flush any remaining objects
    if (batcher.payload().objects.length > 0) await batcher.do()

    console.log(`Finished importing ${counter} articles.`)
  }

  return {
    ImportBasic,
    ImportWithId,
    ImportWithVector,
    ImportWithNamedVector,
    ImportStream,
  }
}
