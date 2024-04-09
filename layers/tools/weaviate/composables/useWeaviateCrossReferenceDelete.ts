export const useWeaviateCrossReferenceDelete = () => {
  const { weaviateApp } = useWeaviate()

  const CrossReferenceDelete = async () => {
    // From the "San Francisco" JeopardyQuestion object, delete the "MUSEUMS" category cross-reference
    await weaviateApp.data
      .referenceDeleter()
      .withClassName('JeopardyQuestion')
      .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
      .withReferenceProperty('hasCategory')
      .withReference(
        weaviateApp.data
          .referencePayloadBuilder()
          .withClassName('JeopardyCategory')
          .withId('fec50326-dfa1-53c9-90e8-63d0240bd933')
          .payload(),
      )
      .do()
  }
  return {
    CrossReferenceDelete,
  }
}
