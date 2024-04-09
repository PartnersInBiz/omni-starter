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

export const weaviateUserClasses = {
  name: 'User',
  properties: [
    ...weaviateAllClass,
    {
      name: 'display_name',
      description: 'Display name of the User',
      type: 'text',
      dataType: ['text'],
    },

    {
      name: 'first_name',
      description: 'First name of the User',
      dataType: ['text'],
    },
    {
      name: 'last_name',
      description: 'Last name of the User',
      dataType: ['text'],
    },
    {
      name: 'short_bio',
      description: 'Short Bio of the User',
      dataType: ['text'],
    },
    {
      name: 'bio',
      description: 'Bio of the User',
      dataType: ['text'],
    },
    {
      name: 'address',
      description: 'Email address of the User',
      dataType: ['Address'],
      cardinality: 'many',
    },
    {
      name: 'email',
      description: 'Email of the User',
      dataType: ['Email'],
      cardinality: 'many',
    },
    {
      name: 'phone',
      description: 'Phone number of the User',
      dataType: ['Phone'],
      cardinality: 'many',
    },
    {
      name: 'password_encrypted',
      description: 'Encrypted Password of the User',
      dataType: ['text'],
    },
    {
      name: 'socials',
      description: 'Social Media accounts of the Contact',
      dataType: ['Socials'],
      cardinality: 'many',
    },
    {
      name: 'trust_device',
      description: 'Flag indicating if the User trusts the device',
      dataType: ['boolean'],
    },

    {
      name: 'status',
      description: 'Status of the User',
      dataType: ['text'],
    },
    {
      name: 'active',
      description: 'Flag indicating if the User is active',
      dataType: ['boolean'],
    },
    // {
    //   name: "avatar",
    //   dataType: ["Media"],
    //   description: "Avatar of the User",
    // },
    // {
    //   name: "badge",
    //   dataType: ["Media"],
    //   description: "Badge of the User",
    // },
    // {
    //   name: "background_image",
    //   dataType: ["Media"],
    //   description: "Background image of the User",
    // },
  ],
}

export const weaviateAccountClasses = {
  name: 'Account',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      dataType: ['text'],
      description: 'Name of the account',
    },
    {
      name: 'description',
      dataType: ['text'],
      description: 'Description of the account',
    },
    {
      name: 'currency',
      dataType: ['text'],
      description: 'Currency of the account',
    },
    {
      name: 'balance',
      dataType: ['number'],
      description: 'Balance of the account',
    },
    // {
    //   name: "logo",
    //   dataType: ["Media"],
    //   description: "Logo of the account",
    // },
    // {
    //   name: "badge",
    //   dataType: ["Media"],
    //   description: "Badge of the account",
    // },
    // {
    //   name: "background_image",
    //   dataType: ["Media"],
    //   description: "Background image of the account",
    // },
    {
      name: 'tools',
      dataType: ['Tool'],
      cardinality: 'many',
    },
    {
      name: 'status',
      dataType: ['text'],
    },
    {
      name: 'socials',
      description: 'Social Media accounts of the Contact',
      dataType: ['Socials'],
      cardinality: 'many',
    },
    {
      name: 'type',
      dataType: ['text'],
    },
    {
      name: 'active',
      dataType: ['boolean'],
    },
    {
      name: 'workspace',
      dataType: ['boolean'],
    },
    {
      name: 'admins',
      dataType: ['User'],
      cardinality: 'many',
    },
    {
      name: 'address',
      description: 'Address of account',
      dataType: ['Address'],
      cardinality: 'many',
    },
    {
      name: 'email',
      description: 'Email of the account',
      dataType: ['Email'],
      cardinality: 'many',
    },
    {
      name: 'phone',
      description: 'Phone number of the account',
      dataType: ['Phone'],
      cardinality: 'many',
    },
  ],
}
