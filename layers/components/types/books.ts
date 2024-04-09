// types for Books
export interface Book {
  id: string
  title: string
  author: string
  price: number
  cover: Media
  user: User
  tools: string[]
  created_at: string
  updated_at: string
  status: string
  active: boolean
  admins: string[]
  type: AccountType
}

export type BookType = 'individual' | 'family' | 'group' | 'company' | undefined

export interface Customer {
  name?: string
  logo?: string
  location?: string
}

export interface Tool {
  name: string
  logo: string
  description: string
}

export interface TeamMember {
  name: string
  picture: string
  role: TeamMemberRole
}

export interface Project {
  type?: AccountType
  name?: string
  description?: string
}
