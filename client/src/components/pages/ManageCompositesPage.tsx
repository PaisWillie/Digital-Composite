/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import TextButton from 'components/Button/TextButton'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'
import { programOptions, yearOptions } from 'utils/constants'
import { showErrorToast, showSuccessToast } from 'components/Toasts/Toasts'
import AdminLayout from 'components/Layout/AdminLayout'

interface Composite {
  id: string
  program: string
  year: string
  ogprogram: string
}

// OGPROGRAM IS THE ORIGINAL PROGRAM NAME WITHOUT SPACES

function ManageCompositesPage() {
  const [composites, setComposites] = useState<Composite[]>([])
  const [filteredComposites, setFilteredComposites] = useState<Composite[]>([])
  const [selectedYear, setSelectedYear] = useState<{
    value: string
    label: string
  } | null>(null)
  const [selectedProgram, setSelectedProgram] = useState<{
    value: string
    label: string
  } | null>(null)
  const navigate = useNavigate()

  // Fetch composites from the API when the component mounts
  const fetchComposites = useCallback(async () => {
    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_HOST}/students/getUniquePrograms`
      ) // Fill in the API URL
      if (!response.ok) throw new Error('Failed to fetch composites')

      const data = await response.json()
      const formattedData = data.map((item: string, index: number) => {
        const [year, program] = item.split('#')
        const formattedProgram = program.replace(/([a-z])([A-Z])/g, '$1 $2')
        return {
          id: index.toString(),
          year,
          program: formattedProgram,
          ogprogram: program
        }
      })
      setComposites(formattedData)
      setFilteredComposites(formattedData)
    } catch (error: any) {
      showErrorToast(`Error fetching composites: ${error.message}`)
    }
  }, [])

  useEffect(() => {
    fetchComposites()
  }, [fetchComposites])

  // Function to filter composites based on selected year and program
  useEffect(() => {
    let filtered = composites

    if (selectedYear) {
      filtered = filtered.filter((c) => c.year === selectedYear.value)
    }
    if (selectedProgram) {
      filtered = filtered.filter((c) => c.ogprogram === selectedProgram.value)
    }

    setFilteredComposites(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedProgram])

  const handleEdit = async (composite: Composite) => {
    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_HOST}/composite/getComposite?year=${
          composite.year
        }&program=${composite.ogprogram}`
      )
      if (!response.ok) throw new Error('Failed to fetch composite')

      const fileBlob = await response.blob()
      const file = new File(
        [fileBlob],
        `${composite.program}_${composite.year}.jpg`,
        { type: fileBlob.type }
      )

      const response2 = await fetch(
        `https://${
          import.meta.env.VITE_HOST
        }/students/getStudentByYearProgram?year=${composite.year}&program=${
          composite.ogprogram
        }`
      )
      if (!response2.ok)
        throw new Error('Failed to fetch students for this composite')
      const result2 = await response2.json()

      navigate('/Admin/CompositeViewPage', {
        state: {
          id: uuidv4(),
          file,
          program: composite.ogprogram,
          year: composite.year,
          names: result2
        }
      })
    } catch (error: any) {
      showErrorToast(`Error fetching composite: ${error.message}`)
    }
  }

  const handleDelete = async (composite: Composite) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this composite?'
    )
    if (!confirmDelete) return

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_HOST}/composite/deleteComposite`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            year: composite.year,
            program: composite.ogprogram
          })
        }
      )

      if (!response.ok) throw new Error('Failed to delete composite')
      showSuccessToast('Composite deleted successfully')
      fetchComposites()
    } catch (error: any) {
      showErrorToast(`Error deleting composite: ${error.message}`)
    }
  }

  return (
    <AdminLayout currPageHref="/admin/manageCompositesPage">
      <div className="mb-6 flex gap-4">
        <div className="mb-4">
          <label className="block pb-1 text-sm font-medium text-gray-700">
            Select Program
          </label>
          <Select
            options={programOptions}
            value={selectedProgram}
            onChange={setSelectedProgram}
            isClearable
            placeholder="Select Program"
          />
        </div>

        <div className="mb-4">
          <label className="block pb-1 text-sm font-medium text-gray-700">
            Select Year
          </label>
          <Select
            options={yearOptions}
            value={selectedYear}
            onChange={setSelectedYear}
            isClearable
            placeholder="Select Year"
          />
        </div>
      </div>

      {filteredComposites.length === 0 ? (
        <p className="text-gray-500">
          No composites available for the selected filters.
        </p>
      ) : (
        <table className="w-full max-w-4xl border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Program</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComposites.map((composite) => (
              <tr key={composite.id}>
                <td className="border p-2">{composite.program}</td>
                <td className="border p-2">{composite.year}</td>
                <td className="flex gap-2 border p-2">
                  <TextButton
                    variant="primary"
                    onClick={() => handleEdit(composite)}
                  >
                    Edit
                  </TextButton>
                  <TextButton
                    variant="tertiary"
                    onClick={() => handleDelete(composite)}
                  >
                    Delete
                  </TextButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}

export default ManageCompositesPage
