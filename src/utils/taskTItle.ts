export const trimTask = (title: string, characters: number) => {
  return title.length > characters ? title.substring(0, 30) + ' ...' : title
}
