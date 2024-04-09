export interface Media {
  id: string
  name: string
  type: string
  url: string
  user: User
  created_at: string
  updated_at: string
  status: string
  active: boolean
  admins: string[]
}
