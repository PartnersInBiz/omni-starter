import weaviate, {
  type WeaviateClient,
  ApiKey,
  generateUuid5,
} from 'weaviate-ts-client'
import {
  weaviateUserClasses,
  weaviateAccountClasses,
  weaviateEmailClasses,
  weaviateAddressClasses,
  weaviatePhoneClasses,
  weaviateContactClasses,
  weaviateProductClasses,
  weaviateMediaClasses,
  weaviateFooterClasses,
  weaviateHeaderClasses,
  weaviateComponentClasses,
  weaviatePlatformClasses,
  weaviateToolClasses,
  weaviatePageClasses,
  weaviateApplicationClasses,
  weaviateProjectsClasses,
  weaviateCategoryClasses,
  weaviateAttributesClasses,
  weaviateTagClasses,
  weaviateRoleFunctionClasses,
  weaviateRoleClasses,
  weaviateSocialsClasses,
  weaviateFormActionsClasses,
  weaviateFormClasses,
  weaviateCalendarClasses,
  weaviateCalendarAttributesClasses,
  weaviateSnakeClasses,
  weaviateSnakeLeaderboardClasses
} from '../types/index'

const config: any = useRuntimeConfig()
const test = process.env.NODE_ENV === 'development'
const weaviateConfig: any = test
  ? config.public.WEAVIATE_TEST
  : config.public.WEAVIATE


const weaviateApp: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: weaviateConfig.host, // Replace with your endpoint
  apiKey: new ApiKey(weaviateConfig.apiKey), // Replace w/ your Weaviate instance API
  headers: {
    'X-OpenAI-Api-Key': config.public.OPENAI.secret,
    'X-Palm-Api-Key': config.public.PALM.apiKey,
  },
})

export const useWeaviate = () => {



  const weaviateClasses: any = computed(() => {
    return [
      weaviateUserClasses,
      weaviateAccountClasses,
      weaviateEmailClasses,
      weaviateAddressClasses,
      weaviatePhoneClasses,
      weaviateContactClasses,
      weaviateProductClasses,
      weaviateMediaClasses,
      weaviateHeaderClasses,
      weaviateFooterClasses,
      weaviateComponentClasses,
      weaviatePlatformClasses,
      weaviateToolClasses,
      weaviatePageClasses,
      weaviateApplicationClasses,
      weaviateCategoryClasses,
      weaviateAttributesClasses,
      weaviateProjectsClasses,
      weaviateTagClasses,
      weaviateRoleClasses,
      weaviateRoleFunctionClasses,
      weaviateSocialsClasses,
      weaviateFormActionsClasses,
      weaviateFormClasses, weaviateCalendarClasses,
      weaviateCalendarAttributesClasses,
      weaviateSnakeClasses,
      weaviateSnakeLeaderboardClasses
    ]
  })

  const weaviateClassesName: any = computed(() => {
    return {
      User: weaviateUserClasses,
      Account: weaviateAccountClasses,
      Email: weaviateEmailClasses,
      Address: weaviateAddressClasses,
      Phone: weaviatePhoneClasses,
      Contact: weaviateContactClasses,
      Product: weaviateProductClasses,
      Media: weaviateMediaClasses,
      Header: weaviateHeaderClasses,
      Footer: weaviateFooterClasses,
      Component: weaviateComponentClasses,
      Platform: weaviatePlatformClasses,
      Tool: weaviateToolClasses,
      Page: weaviatePageClasses,
      Application: weaviateApplicationClasses,
      Category: weaviateCategoryClasses,
      Attributes: weaviateAttributesClasses,
      Projects: weaviateProjectsClasses,
      Tag: weaviateTagClasses,
      Role: weaviateRoleClasses,
      RoleFunction: weaviateRoleFunctionClasses,
      Socials: weaviateSocialsClasses,
      FormActions: weaviateFormActionsClasses,
      Form: weaviateFormClasses,
      Calendar: weaviateCalendarClasses,
      CalendarAttributes: weaviateCalendarAttributesClasses,
      Snake: weaviateSnakeClasses,
      SnakeLeaderboard: weaviateSnakeLeaderboardClasses
    }
  })

  const weaviateDataTypes = useState('weaviateDataTypes', () => {
    return [
      ['text'],
      ['text[]'],
      ['object'],
      ['object[]'],
      ['int'],
      ['int[]'],
      ['boolean'],
      ['boolean[]'],
      ['number'],
      ['number[]'],
      ['date'],
      ['date[]'],
      ['uuid'],
      ['uuid[]'],
      ['geoCoordinates'],
      ['phoneNumber'],
      ['blob'],
    ]
  })

  const weaviateCollections: any = useState('weaviateCollections', () => [])
  const selectedClass: any = useState('selectedClass', () => {
    return {
      class: '',
      description: '',
      properties: [],
    }
  })

  const selectedClassProperties: any = useState(
    'selectedClassProperties',
    () => [],
  )

  const properties = computed(() => {
    if (!selectedClass.value.properties) return []
    return selectedClass.value.properties.map((proper: any, index: any) => {
      return {
        id: index,
        title: proper.name,
        description: proper.description,
        tags: proper.dataType,
      }
    })
  })

  const isDataTypeValid = (dataType: any) => {
    return weaviateDataTypes.value.some((validDataType: any) => {
      return JSON.stringify(validDataType) === JSON.stringify([dataType])
    })
  }

  const isDataTypeValid2 = (dataType: any) => {
    return weaviateDataTypes.value.some((validDataType: any) => {
      return JSON.stringify(validDataType) === JSON.stringify(dataType)
    })
  }

  const weaviateClassesWithoutCrossReference = computed(() => {
    //copy the weaviateClasses
    const newClasses = JSON.parse(JSON.stringify(weaviateClasses.value))
    const newArray: any = []
    newClasses.forEach((classItem: { properties: any[] }) => {
      classItem.properties = classItem.properties.filter((property) => {
        const someDataType = !property.dataType.some(
          (dataType: any) => !isDataTypeValid(dataType),
        )
        return someDataType
      })
      newArray.push(classItem)
      return classItem
    })
    return newArray
  })

  const weaviateClassesWithCrossReference = computed(() => {
    //copy the weaviateClasses
    const newClasses = JSON.parse(JSON.stringify(weaviateClasses.value))
    const newArray: any = []
    newClasses.forEach((classItem: { properties: any[] }) => {
      classItem.properties = classItem.properties.filter((property) => {
        const someDataType = !property.dataType.some(
          (dataType: any) => !isDataTypeValid(dataType),
        )
        return !someDataType
      })
      newArray.push(classItem)
      return classItem
    })
    return newArray
  })

  const createClassesWithCrossReference = (cl: any) => {
    cl.properties = cl.properties.filter((property: any) => {
      const someDataType = !property.dataType.some(
        (dataType: any) => !isDataTypeValid(dataType),
      )
      return !someDataType
    })

    return cl.properties.map((classItem: any) => {
      return { type: classItem.dataType[0], name: classItem.name }
    })
  }

  const lastOfBeacon = (beacon: string) => {
    return beacon.split('/').pop()
  }

  return {
    weaviateApp,
    weaviateClasses,
    generateUuid5,
    weaviateDataTypes,
    weaviateCollections,
    selectedClass,
    selectedClassProperties,
    properties,
    weaviateConfig,
    isDataTypeValid,
    isDataTypeValid2,
    weaviateClassesWithoutCrossReference,
    weaviateClassesWithCrossReference,
    createClassesWithCrossReference,
    weaviateClassesName,
    weaviateUserClasses,
    weaviateAccountClasses,
    weaviateEmailClasses,
    weaviateAddressClasses,
    weaviatePhoneClasses,
    weaviateContactClasses,
    weaviateProductClasses,
    weaviateMediaClasses,
    weaviateHeaderClasses,
    weaviateFooterClasses,
    weaviateComponentClasses,
    weaviatePlatformClasses,
    weaviateToolClasses,
    weaviatePageClasses,
    weaviateApplicationClasses,
    weaviateCategoryClasses,
    weaviateAttributesClasses,
    weaviateProjectsClasses,
    weaviateTagClasses,
    weaviateRoleClasses,
    weaviateRoleFunctionClasses,
    weaviateSocialsClasses,
    weaviateFormActionsClasses,
    weaviateFormClasses,
    weaviateCalendarClasses,
    weaviateCalendarAttributesClasses,
    weaviateSnakeClasses,
    weaviateSnakeLeaderboardClasses,
    lastOfBeacon,
  }
}
