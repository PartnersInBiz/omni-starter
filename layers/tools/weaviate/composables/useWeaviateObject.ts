export const useWeaviateObject = () => {
  const { weaviateApp } = useWeaviate()

  const ObjectValidate = async (className: string, object: any) => {
    try {
      await weaviateApp.data
        .validator()
        .withClassName('JeopardyQuestion')
        .withId('12345678-1234-1234-1234-123456789012') // placeholder in UUID format (required)
        .withProperties({
          question: 'This vector DB is open-source and supports auto-schema',
          answer: 'Weaviate',
          thisPropShouldNotEndUpInTheSchema: -1,
        })
        .do()
    } catch (e: any) {
      // "invalid object: no such prop with name 'thisPropShouldNotEndUpInTheSchema' found..."
      console.error(
        'Expecting error about thisPropShouldNotEndUpInTheSchema:',
        e.message,
      )
    }
  }

  return {
    ObjectValidate,
  }
}
