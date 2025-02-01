// IMPORTANT!
// DO NOT CHANGE THESE VALUES AS IT MAPS TO THE BACKEND FILE PATHING
//IMPORTANT!
export const programOptions = [
  { label: 'BTech', value: 'BTech' },
  { label: 'Chemical Engineering', value: 'ChemicalEngineering' },
  { label: 'Civil Engineering', value: 'CivilEngineering' },
  { label: 'Computer Engineering', value: 'ComputerEngineering' },
  { label: 'Computer Science', value: 'ComputerScience' },
  { label: 'Electrical', value: 'Electrical' },
  { label: 'Engineering Class', value: 'EngineeringClass' },
  { label: 'Engineering Physics', value: 'EngineeringPhysics' },
  { label: 'IBEHS', value: 'IBEHS' },
  { label: 'iBioMed', value: 'iBioMed' },
  { label: 'Materials', value: 'Materials' },
  { label: 'Mechanical', value: 'Mechanical' },
  { label: 'Mechatronics', value: 'Mechatronics' },
  { label: 'Software Engineering', value: 'SoftwareEngineering' }
]

const currentYear = new Date().getFullYear()
export const yearOptions = Array.from(
  { length: currentYear - 1920 + 1 },
  (_, i) => {
    const year = currentYear - i
    return { label: year.toString(), value: year.toString() }
  }
)
