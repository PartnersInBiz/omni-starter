export default function useSnakeGetFunc() {
  const { snakeCompetitions,  selectedSnakeCompetition } = useSnake()

  const getSnakes = async () => {
    const { ObjectRetrieveWithFilter } = useWeaviateObjectRetrieve()
    const { account, userContact } = useAccount()

    const res = await ObjectRetrieveWithFilter(
      'Snake',
      'type name description start_date end_date tile_count _additional { id creationTimeUnix lastUpdateTimeUnix}',
      {
        path: ['access_contact', 'Contact', 'id'],
        operator: 'ContainsAny',
        valueString: [userContact.value._additional.id],
      },
    )
    snakeCompetitions.value = res
    return res
  }

  const getSnakeById = async (id: string) => {
    const { ObjectRetrieveWithFilter } = useWeaviateObjectRetrieve()
    const { account, userContact } = useAccount()

    const res = await ObjectRetrieveWithFilter(
      'Snake',
      'type name description layout start_date end_date customer {...on Account {name description _additional { id creationTimeUnix lastUpdateTimeUnix}}} stage  colors {head snake apple board} rating players {...on Account {name description _additional { id creationTimeUnix lastUpdateTimeUnix}}} tile_count budget _additional { id creationTimeUnix lastUpdateTimeUnix}',
      {
        path: ['id'],
        operator: 'Equal',
        valueText: id,
      },
    )
    return res.length > 0 ? res[0] : {}
  }

  

  return {
    getSnakes,
    getSnakeById,
  }
}
