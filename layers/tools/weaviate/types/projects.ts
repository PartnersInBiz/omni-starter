export const weaviateAllClass = [
  {
    name: 'user',
    description: 'ID of the user that created',
    dataType: ['User'],
  },
  {
    name: 'main_account',
    description: 'ID of the account that created',
    dataType: ['Account'],
  },
  {
    name: 'access_contact',
    description: 'ID of the team that has access',
    dataType: ['Contact'],
    cardinality: 'many',
  },
  {
    name: 'access_account',
    description: 'ID of the account team that has access',
    dataType: ['Account'],
    cardinality: 'many',
  },
  {
    name: 'linked_contact',
    description: 'ID of the contacts record belongs too',
    dataType: ['Contact'],
    cardinality: 'many',
  },
  {
    name: 'linked_account',
    description: 'ID of the account record belongs too',
    dataType: ['Account'],
    cardinality: 'many',
  },
]

export const weaviateProjectsClasses = {
  name: 'Project',
  properties: [
    ...weaviateAllClass,
    {
      name: 'type',
      dataType: ['text'],
      description: 'Type of the application',
    },
    {
      name: 'name',
      dataType: ['text'],
      description: 'Name of the application',
    },
    {
      name: 'description',
      dataType: ['text'],
      description: 'Description of the application',
    },
    {
      name: 'start_date',
      dataType: ['date'],
      description: 'Start date of the application',
    },
    {
      name: 'end_date',
      dataType: ['date'],
      description: 'End date of the application',
    },
    {
      name: 'customer',
      dataType: ['Contact'],
      description: 'Customer of the application',
    },
    // {
    //   name: "files",
    //   dataType: ["Media"],
    //   description: "Files of the application",
    // },
    // {
    //   name: "avatar",
    //   dataType: ["Media"],
    //   description: "Avatar of the application",
    // },

    {
      name: 'tools',
      dataType: ['Tool'],
      cardinality: 'many',
      description: 'Tools of the application',
    },
    {
      name: 'budget',
      dataType: ['text'],
      description: 'Budget of the application',
    },
  ],
}

export const weaviateToolClasses = {
  name: 'Tool',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      dataType: ['text'],
      description: 'Name of tool',
    },
    {
      name: 'description',
      dataType: ['text'],
      description: 'Description of tool',
    },
    {
      name: 'logo',
      dataType: ['text'],
      description: 'Icon of tool',
    },
    {
      name: 'configuration',
      dataType: ['uuid'],
      description: 'Config of tool',
    },
  ],
}
