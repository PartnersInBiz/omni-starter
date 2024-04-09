export const useWeaviateObjectDelete = () => {
  const { weaviateApp } = useWeaviate()

  const DeleteProperty = async () => {
    async function delProps(
      uuid: string,
      className: string,
      propNames: string[],
    ) {
      const objectData: any = await weaviateApp.data
        .getterById()
        .withId(uuid)
        .withClassName(className)
        .do()
      for (const propName of propNames)
        if (propName in objectData.properties)
          delete objectData.properties[propName]
      // Replace the object
      return await weaviateApp.data
        .updater()
        .withId(uuid)
        .withClassName(className)
        .withProperties(objectData.properties)
        .do()
    }

    const id = '...' // replace with the id of the object you want to delete properties from
    await delProps(id, 'JeopardyQuestion', ['answer'])
  }

  const DeleteObjectById = async (className: string, id: string) => {
    await weaviateApp.data
      .deleter()
      .withClassName(className) // Class of the object to be deleted
      .withId(id)
      .do()
  }

  const DeleteMultipleObjects = async () => {
    await weaviateApp.batch
      .objectsBatchDeleter()
      .withClassName('EphemeralObject')
      .withWhere({
        path: ['name'],
        operator: 'Like',
        valueText: 'EphemeralObject*',
      })
      .do()
  }

  const DeleteContains = async () => {
    await weaviateApp.batch
      .objectsBatchDeleter()
      .withClassName('EphemeralObject')
      .withWhere({
        path: ['name'],
        operator: 'ContainsAny',
        valueTextArray: ['asia', 'europe'], // Note the array syntax
      })
      .do()
  }

  const DeleteMultipleObjectsById = async () => {
    await weaviateApp.batch
      .objectsBatchDeleter()
      .withClassName('EphemeralObject')
      .withWhere({
        path: ['id'],
        operator: 'ContainsAny',
        valueTextArray: [
          '12c88739-7a4e-49fd-bf53-d6a829ba0261',
          '3022b8be-a6dd-4ef4-b213-821f65cee53b',
          '30de68c1-dd53-4bed-86ea-915f34faea63',
        ], // Note the array syntax
      })
      .do()
  }

  const DeleteOptionalParams = async () => {
    const response = await weaviateApp.batch
      .objectsBatchDeleter()
      .withClassName('EphemeralObject')
      // Same `where` filter as in the GraphQL API
      .withWhere({
        path: ['name'],
        operator: 'Like',
        valueText: 'EphemeralObject*',
      })
      .withDryRun(true)
      .withOutput('verbose')
      .do()

    console.log(response)
  }

  return {
    DeleteProperty,
    DeleteObjectById,
    DeleteMultipleObjects,
    DeleteContains,
    DeleteMultipleObjectsById,
    DeleteOptionalParams,
  }
}
