export default function useBuildersGetFunc() {
  const { applications, application, pages, components, page } = useBuilders()
  const { generateUuid5, weaviateConfig, lastOfBeacon } = useWeaviate()
  const { ObjectUpdate } = useWeaviateObjectUpdate()
  const { ObjectCreateWithId } = useWeaviateObjectCreate()
  const { ownerInfo } = useAccountFunc()

  const setApplicationsPages = async () => {
    if (application.value.pages == undefined) return []
    const { ObjectRetrieveById } = useWeaviateObjectRetrieve()
    pages.value = []
    for (let i = 0; i < application.value.pages.length; i++) {
      const res = await ObjectRetrieveById('Page', application.value.pages[i])
      pages.value.push(res)
    }
  }

  const setApplications = async () => {
    const { ObjectRetrieveWithFilter } = useWeaviateObjectRetrieve()
    const { account, userContact } = useAccount()
    const res = await ObjectRetrieveWithFilter(
      'Application',
      'name description team platforms{ ...on Platform {name logo description} } tools{...on Tool {name logo description}} budget _additional { id creationTimeUnix lastUpdateTimeUnix}',
      {
        path: ['access_contact', 'Contact', 'id'],
        operator: 'ContainsAny',
        valueString: [userContact.value._additional.id],
      },
    )
    applications.value = res
    return res
  }

  const setApplicationById = async (id: string) => {
    const { ObjectRetrieveWithFilter } = useWeaviateObjectRetrieve()
    const { account, userContact } = useAccount()

    const res = await ObjectRetrieveWithFilter(
      'Application',
      'type name description start_date end_date customer {...on Account {name description _additional { id creationTimeUnix lastUpdateTimeUnix}}} stage target_dir colors {primary secondary tertiary success warning danger info} pages {...on Page {type title description _additional { id creationTimeUnix lastUpdateTimeUnix}}} platforms{ ...on Platform {name logo description _additional { id creationTimeUnix lastUpdateTimeUnix}} } tools{...on Tool {name logo description}} budget _additional { id creationTimeUnix lastUpdateTimeUnix}',
      {
        path: ['id'],
        operator: 'Equal',
        valueText: id,
      },
    )
    application.value = res.length > 0 ? res[0] : {}
    return res.length > 0 ? res[0] : {}
  }

  const saveComponents = async () => {
    // if (state.customer && Object.keys(state.customer).length > 0) {
    //   state.hasCategory.push({ customer: state.customer });
    // }
    const ids = []

    for (let i = 0; i < components.value.length; i++) {
      const comp: any = components.value[i]
      let state = {
        class: comp.class,
        comp: comp.comp,
        page: comp.page ? comp.page : [],
        schema: comp.schema,
        title: comp.title,
        rank: comp.rank ? comp.rank : [],
      }
      state = removeUndefined(state)
      if (
        !comp._additional ||
        !comp._additional.id ||
        comp._additional.id == ''
      ) {
        const newComp = {
          ...state,
          ...ownerInfo({}),
        }

        const hasPage = state.page.findIndex((el: any) => {
          return lastOfBeacon(el.beacon) === page.value._additional.id
        })

        if (hasPage == -1) {
          state.page.push({
            beacon: `${weaviateConfig.host}/${page.value._additional.id}`,
          })
        }
        if (!state.rank) state.rank = []
        const hasRank = state.rank.findIndex((el: any) => {
          return el.page === page.value._additional.id
        })

        if (hasRank == -1) {
          state.rank.push({
            page: page.value._additional.id,
            rank: i,
          })
        } else {
          state.rank[hasRank].rank = i
        }

        const resultOb: any = await ObjectCreateWithId(
          'Component',
          newComp,
          generateUuid5(JSON.stringify(newComp)),
        )

        components.value[i] = resultOb

        ids.push(resultOb._additional.id)
      } else {
        const hasPage = state.page.findIndex((el: any) => {
          return lastOfBeacon(el.beacon) === page.value._additional.id
        })

        if (hasPage == -1) {
          state.page.push({
            beacon: `${weaviateConfig.host}/${page.value._additional.id}`,
          })
        }
        if (!state.rank) state.rank = []

        const hasRank = state.rank.findIndex((el: any) => {
          return el.page === page.value._additional.id
        })

        if (hasRank == -1) {
          state.rank.push({
            page: page.value._additional.id,
            rank: i,
          })
        } else {
          state.rank[hasRank].rank = i
        }
        console.log('state UPDATE', state)
        await ObjectUpdate('Component', comp._additional.id, state)
        components.value[i] = state
      }
    }

    if (ids.length > 0) {
      const pageUpdateIds = []

      for (let i = 0; i < ids.length; i++) {
        pageUpdateIds.push({
          beacon: `${weaviateConfig.host}/${ids[i]}`,
        })
      }

      await ObjectUpdate('Page', page.value._additional.id, {
        components: pageUpdateIds,
      })
    }
  }

  return {
    setApplicationsPages,
    setApplications,
    setApplicationById,
    saveComponents,
  }
}
