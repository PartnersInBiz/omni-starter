export function useNotification(title: string, body: string) {
  console.log('useNotification', title, body)
  useTauri().notify(title, body)
}
