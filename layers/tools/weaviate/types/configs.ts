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
  {
    name: 'linked_project',
    dataType: ['Project'],
    cardinality: 'many',
  },
]

export const weaviateConfigTwilioClasses = {
  name: 'ConfigTwilio',
  properties: [
    ...weaviateAllClass,
    {
      name: 'type',
      dataType: ['text'],
      description: 'Type of the form',
    },
    {
      name: 'name',
      dataType: ['text'],
      description: 'Name of the form',
    },
    {
      name: 'description',
      dataType: ['text'],
      description: 'Description of the form',
    },
    {
      name: 'accountSid',
      dataType: ['text'],
      description: 'Twilio Account SID',
    },
    {
      name: 'authToken',
      dataType: ['text'],
      description: 'Twilio Auth Token',
    },
    {
      name: 'phoneNumbers',
      dataType: ['phoneNumber[]'],
      description: 'Twilio Phone Numbers',
    },
    {
      name: 'messagingServiceSid',
      dataType: ['text'],
      description: 'Twilio Messaging Service SID',
    },
  ],
}
