import { programOptions } from 'utils/constants'

export const parseProgram = (value: string) => {
  const program = programOptions.find((option) => option.value === value)
  return program ? program.label : ''
}
