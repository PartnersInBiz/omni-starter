export const useWeaviateSearch = () => {
  const { weaviateApp } = useWeaviate()

  const SearchBasic = async (className: string, withFields: string) => {
    const result: any = await weaviateApp.graphql
      .get()
      .withClassName(className)
      .withFields(withFields)
      .do()

    return result.data.Get[className]
  }

  const SearchWithId = async (
    className: string,
    id: string,
    withFields: string,
  ) => {
    const result: any = await weaviateApp.graphql
      .get()
      .withClassName(className)
      .withFields(withFields)
      .withWhere({
        path: ['id'],
        operator: 'Equal',
        valueString: id,
      })
      .do()

    return result.data.Get[className]
  }

  const SearchLimit = async () => {
    const result = await weaviateApp.graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withFields('question')
      .withLimit(1)
      .do()

    console.log(JSON.stringify(result, null, 2))
  }

  const SearchPaginate = async () => {
    const result = await weaviateApp.graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withFields('question')
      .withLimit(1)
      .withOffset(1)
      .do()

    console.log(JSON.stringify(result, null, 2))
  }

  const SearchPaginateAll = async (
    className: string,
    withFields: string,
    withWhere: any,
    limit?: number,
    offset?: number,
  ) => {
    console.log('withFields', withFields)
    console.log('withWhere', withWhere)
    console.log('limit', limit)
    console.log('offset', offset)
    console.log('className', className)
    const result = await weaviateApp.graphql
      .get()
      .withClassName(className)
      .withFields(withFields)
      .withLimit(limit || 10)
      .withWhere(withWhere)
      .do()

    console.log(JSON.stringify(result, null, 2))
    return result.data.Get[className]
  }

  return {
    SearchBasic,
    SearchWithId,
    SearchLimit,
    SearchPaginate,
    SearchPaginateAll,
  }
}
