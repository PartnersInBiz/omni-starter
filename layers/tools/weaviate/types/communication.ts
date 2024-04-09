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

export const weaviateEmailClasses = {
  name: 'Email',
  properties: [
    ...weaviateAllClass,
    {
      name: 'type',
      dataType: ['text'],
      description: 'Type of the email',
    },
    {
      name: 'email',
      dataType: ['text'],
      description: 'Email address',
    },
    {
      name: 'auth',
      dataType: ['boolean'],
      description: 'Email used to authenticate',
    },
    {
      name: 'verified',
      dataType: ['boolean'],
      description: 'Email address is verified',
    },
    {
      name: 'configuration',
      dataType: ['uuid'],
      description: 'Email configuration',
    },
  ],
}

export const weaviateAddressClasses = {
  name: 'Address',
  properties: [
    ...weaviateAllClass,
    {
      name: 'type',
      dataType: ['text'],
      description: 'Type of the address',
    },
    {
      name: 'street',
      dataType: ['text'],
      description: 'Street',
    },
    {
      name: 'complex',
      dataType: ['text'],
    },
    {
      name: 'suburb',
      dataType: ['text'],
    },
    {
      name: 'city',
      dataType: ['text'],
    },
    {
      name: 'state',
      dataType: ['text'],
    },
    {
      name: 'postalCode',
      dataType: ['text'],
    },
    {
      name: 'country',
      dataType: ['text'],
    },
    {
      name: 'country_code',
      dataType: ['text'],
    },
    {
      name: 'geopoints',
      dataType: ['geoCoordinates'],
    },
  ],
}

export const weaviatePhoneClasses = {
  name: 'Phone',
  properties: [
    ...weaviateAllClass,
    {
      name: 'type',
      dataType: ['text'],
    },
    {
      name: 'number',
      dataType: ['phoneNumber'],
    },
    {
      name: 'verified',
      dataType: ['boolean'],
    },
    {
      name: 'configuration',
      dataType: ['uuid'],
    },
  ],
}
