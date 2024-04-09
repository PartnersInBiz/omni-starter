export const useWeaviateObjectRetrieve = () => {
  const { weaviateApp } = useWeaviate()

  const ObjectRetrieveById = async (className: string, id: string) => {
    try {
      const result: any = await weaviateApp.data
        .getterById()
        .withClassName(className)
        .withId(id)
        .do()

      console.log(JSON.stringify(result, null, 2))
      return {
        ...result.properties,
        _additional: {
          creationTimeUnix: result.creationTimeUnix,
          id: result.id,
          lastUpdateTimeUnix: result.lastUpdateTimeUnix,
        },
      }
    } catch (e) {
      console.log(e)
      return null
    }
  }

  const ObjectRetrieveWithFilter = async (
    className: string,
    withFields: string,
    withWhere: any,
  ) => {
    console.log('withFields', withFields)
    console.log('withWhere', withWhere)
    const result = await weaviateApp.graphql
      .get()
      .withClassName(className)
      .withFields(withFields)
      .withWhere(withWhere)
      .do()
    console.log('RESULT', result)
    console.log(JSON.stringify(result, null, 2))
    return result.data.Get[className]
  }

  const ObjectRetrieveByIdWithVector = async () => {
    const result = await weaviateApp.data
      .getterById()
      .withClassName('JeopardyQuestion')
      .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
      .withVector()
      .do()

    console.log(JSON.stringify(result, null, 2))
  }

  const ObjectRetrieveAll = async (
    collectionName: string,
    batchSize: number,
    cursor: any,
    withFields: string,
  ) => {
    // STEP 1 - Prepare a helper function to iterate through data in batches
    async function getBatchWithCursor(
      collectionName: string,
      batchSize: number,
      cursor: string,
      withFields: string,
    ): Promise<any[]> {
      // First prepare the query to run through data
      const query = weaviateApp.graphql
        .get()
        .withClassName(collectionName)
        .withFields(withFields)
        .withLimit(batchSize)

      if (cursor) {
        // Fetch the next set of results
        const result = await query.withAfter(cursor).do()
        return result.data.Get[collectionName]
      } else {
        // Fetch the first set of results
        const result = await query.do()
        return result.data.Get[collectionName]
      }
    }

    // STEP 2 - Iterate through the data
    cursor = null
    let batches: any = []
    // Batch import all objects to the target instance
    while (true) {
      // Get Request next batch of objects
      const nextBatch = await getBatchWithCursor(
        collectionName,
        batchSize,
        cursor,
        withFields,
      )

      // Break the loop if empty – we are done
      if (nextBatch.length === 0) break

      // Here is your next batch of objects
      console.log(JSON.stringify(nextBatch))
      // batches.push(nextBatch)
      batches = [...batches, ...nextBatch]

      // Move the cursor to the last returned uuid
      cursor = nextBatch.at(-1)['_additional']['id']
    }
    return batches
  }

  const ObjectRetrieveAllObjectsVectors = async () => {
    // STEP 1 - Prepare a helper function to iterate through data in batches
    async function getBatchWithCursor(
      collectionName: string,
      batchSize: number,
      cursor: string,
    ): Promise<any[]> {
      const query = weaviateApp.graphql
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

  const ObjectRetrieveAllObjectsMultiTenancy = async () => {
    // STEP 1 - Prepare a helper function to iterate through data in batches
    async function getBatchWithCursor(
      collectionName: string,
      tenantName: string,
      batchSize: number,
      cursor: string,
    ): Promise<any[]> {
      const query = weaviateApp.graphql
        .get()
        .withClassName(collectionName)
        .withTenant(tenantName)
        .withFields('title description _additional { id }')
        .withLimit(batchSize)

      if (cursor) {
        const result = await query.withAfter(cursor).do()
        return result.data.Get[collectionName]
      } else {
        const result = await query.do()
        return result.data.Get[collectionName]
      }
    }

    // Get Tenants
    const tenants: any = await weaviateApp.schema
      .tenantsGetter('MultiTenancyClass')
      .do()

    // STEP 2 - Iterate through Tenants
    for await (const tenant of tenants) {
      // For each tenant, reset the cursor to the beginning
      let cursor = null

      while (true) {
        // Request the next batch of objects
        const nextBatch = await getBatchWithCursor(
          'MultiTenancyClass',
          tenant.name,
          100,
          cursor,
        )

        // Break the loop if empty – we are done
        if (nextBatch.length === 0) break

        // Here is your next batch of objects
        console.log(JSON.stringify(nextBatch))

        // Move the cursor to the last returned uuid
        cursor = nextBatch.at(-1)['_additional']['id']
      }
    }
  }

  return {
    ObjectRetrieveById,
    ObjectRetrieveWithFilter,
    ObjectRetrieveByIdWithVector,
    ObjectRetrieveAll,
    ObjectRetrieveAllObjectsVectors,
    ObjectRetrieveAllObjectsMultiTenancy,
  }
}
