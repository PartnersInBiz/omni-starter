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

export const weaviateContactClasses = {
  name: 'Contact',
  properties: [
    ...weaviateAllClass,
    {
      name: 'display_name',
      description: 'Display name of the Contact',
      dataType: ['text'],
    },

    {
      name: 'first_name',
      description: 'First name of the Contact',
      dataType: ['text'],
    },
    {
      name: 'last_name',
      description: 'Last name of the Contact',
      dataType: ['text'],
    },
    {
      name: 'short_bio',
      description: 'Short Bio of the Contact',
      dataType: ['text'],
    },
    {
      name: 'bio',
      description: 'Bio of the Contact',
      dataType: ['text'],
    },
    // {
    //   name: "avatar",
    //   dataType: ["Media"],
    //   description: "Avatar of the Contact",
    // },
    // {
    //   name: "badge",
    //   dataType: ["Media"],
    //   description: "Badge of the Contact",
    // },
    // {
    //   name: "background_image",
    //   dataType: ["Media"],
    //   description: "Background image of the Contact",
    // },
    {
      name: 'address',
      description: 'Email address of the Contact',
      dataType: ['Address'],
      cardinality: 'many',
    },
    {
      name: 'email',
      description: 'Email of the Contact',
      dataType: ['Email'],
      cardinality: 'many',
    },
    {
      name: 'phone',
      description: 'Phone number of the Contact',
      dataType: ['Phone'],
      cardinality: 'many',
    },
    {
      name: 'aliases',
      description: 'Array of aliases associated with the Contact',
      dataType: ['text'],
      cardinality: 'many',
    },
    {
      name: 'status',
      description: 'Status of the Contact',
      dataType: ['text'],
    },
    {
      name: 'role',
      description: 'Role of the Contact',
      dataType: ['Role'],
      cardinality: 'many',
    },
    {
      name: 'socials',
      description: 'Social Media accounts of the Contact',
      dataType: ['Socials'],
      cardinality: 'many',
    },
    {
      name: 'account_access',
      description: 'Is a member of the Contact',
      dataType: ['boolean'],
    },
    {
      name: 'active',
      description: 'Flag indicating if the Contact is active',
      dataType: ['boolean'],
    },
  ],
}

export const weaviateRoleClasses = {
  name: 'Role',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      description: 'Name of the role',
      dataType: ['text'],
    },
    {
      name: 'description',
      description: 'Description of the role',
      dataType: ['text'],
    },
    {
      name: 'status',
      description: 'Status of the role',
      dataType: ['text'],
    },
    {
      name: 'function',
      description: 'Functions of the role',
      dataType: ['RoleFunction'],
      cardinality: 'many',
    },
    {
      name: 'active',
      description: 'Flag indicating if the role is active',
      dataType: ['boolean'],
    },
  ],
}

export const weaviateRoleFunctionClasses = {
  name: 'RoleFunction',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      description: 'Name of the function',
      dataType: ['text'],
    },
    {
      name: 'feature',
      description: 'Feature of the function',
      dataType: ['text'],
    },
    {
      name: 'description',
      description: 'Description of the function',
      dataType: ['text'],
    },
    {
      name: 'read',
      description: 'Read of the function',
      dataType: ['boolean'],
    },
    {
      name: 'write',
      description: 'Write of the function',
      dataType: ['boolean'],
    },
    {
      name: 'edit',
      description: 'Edit of the function',
      dataType: ['boolean'],
    },
    {
      name: 'delete',
      description: 'Delete of the function',
      dataType: ['boolean'],
    },
    {
      name: 'status',
      description: 'Status of the function',
      dataType: ['text'],
    },
    {
      name: 'active',
      description: 'Flag indicating if the function is active',
      dataType: ['boolean'],
    },
  ],
}

export const weaviateProductClasses = {
  name: 'Product',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      description: 'Name of the product',
      dataType: ['text'],
    },
    {
      name: 'description',
      description: 'Description of the product',
      dataType: ['text'],
    },
    {
      name: 'price',
      description: 'Price of the product',
      dataType: ['number'],
    },
    {
      name: 'currency',
      description: 'Currency of the product',
      dataType: ['text'],
    },
    {
      name: 'quantity',
      description: 'Quantity of the product',
      dataType: ['number'],
    },
    {
      name: 'status',
      description: 'Status of the product',
      dataType: ['text'],
    },
    {
      name: 'tags',
      description: 'Tags of the product',
      dataType: ['Tag'],
      cardinality: 'many',
    },
    {
      name: 'category',
      description: 'Tags of the product',
      dataType: ['Category'],
      cardinality: 'many',
    },
    {
      name: 'attributes',
      description: 'Attributes of the product',
      dataType: ['Attributes'],
      cardinality: 'many',
    },

    {
      name: 'active',
      description: 'Flag indicating if the product is active',
      dataType: ['boolean'],
    },
  ],
}

export const weaviateCategoryClasses = {
  name: 'Category',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      description: 'Name of the category',
      dataType: ['text'],
    },
    {
      name: 'description',
      description: 'Description of the category',
      dataType: ['text'],
    },
    {
      name: 'status',
      description: 'Status of the category',
      dataType: ['text'],
    },
    {
      name: 'active',
      description: 'Flag indicating if the category is active',
      dataType: ['boolean'],
    },
  ],
}

export const weaviateTagClasses = {
  name: 'Tag',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      description: 'Name of the tag',
      dataType: ['text'],
    },
    {
      name: 'description',
      description: 'Description of the tag',
      dataType: ['text'],
    },
    {
      name: 'status',
      description: 'Status of the tag',
      dataType: ['text'],
    },
    {
      name: 'active',
      description: 'Flag indicating if the tag is active',
      dataType: ['boolean'],
    },
  ],
}

export const weaviateAttributesClasses = {
  name: 'Attributes',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      description: 'Name of the attribute',
      dataType: ['text'],
    },
    {
      name: 'description',
      description: 'Description of the attribute',
      dataType: ['text'],
    },
    {
      name: 'status',
      description: 'Status of the attribute',
      dataType: ['text'],
    },
    {
      name: 'active',
      description: 'Flag indicating if the attribute is active',
      dataType: ['boolean'],
    },
  ],
}
