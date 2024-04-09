export const useWeaviateCrossReferenceUpdate = () => {
  const { weaviateApp } = useWeaviate()

  const CrossReferenceUpdate = async () => {
    // In the "San Francisco" JeopardyQuestion object, set the "hasCategory" cross-reference only to "MUSEUMS"
    await weaviateApp.data
      .referenceReplacer()
      .withClassName('JeopardyQuestion')
      .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
      .withReferenceProperty('hasCategory')
      .withReferences([
        weaviateApp.data
          .referencePayloadBuilder()
          .withClassName('JeopardyCategory')
          .withId('fec50326-dfa1-53c9-90e8-63d0240bd933')
          .payload(),
      ])
      .do()
  }

  return {
    CrossReferenceUpdate,
  }
}
