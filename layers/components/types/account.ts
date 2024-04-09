import type { Media } from './misc'
export interface User {
  id: string
  first_name?: string
  last_name?: string
  logo?: Media
  email?: string
  phone?: string
  username?: string
  accounts?: string[]
  aliases?: string[]
  created_at?: string
  updated_at?: string
  status?: string
  active?: boolean
}

export interface Account {
  id: string
  name: string
  currency: string
  balance: number
  logo: Media
  user: User
  tools: string[]
  created_at: string
  updated_at: string
  status: string
  active: boolean
  admins: string[]
  type: AccountType
}

export type TeamMemberRole =
  | 'reader'
  | 'collaborator'
  | 'manager'
  | 'owner'
  | undefined

export type AccountType =
  | 'individual'
  | 'family'
  | 'group'
  | 'company'
  | undefined

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
  start_date?: string
  end_date?: string
  customer?: Customer
  budget?: string
  team?: TeamMember[]
  files: FileList | null
  avatar?: File | null
  tools?: Tool[]
}

export interface AccountStepData {
  preview?: boolean
  name: string
  title: string
  subtitle: string
}
