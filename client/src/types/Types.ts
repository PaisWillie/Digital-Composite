export type Student = {
  name: string
  image_id: string
  top_left: [number, number]
  top_right: [number, number]
  bottom_left: [number, number]
  bottom_right: [number, number]
  student_region: [number, number][]
}

export type Program = {
  year: string
  program: string
}
