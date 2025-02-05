/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Line } from 'react-chartjs-2'
import { ChartOptions, ChartData } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import TextButton from 'components/Button/TextButton'
import { showErrorToast } from 'components/Toasts/Toasts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Metric {
  title: string
  value: string | number
}

interface MostCommonSearchTerm {
  term: string
  count: number
}

interface MostViewedComposite {
  program: string
  year: string
  views: number
}

function ViewDashboardAnalyticsPage() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [mostCommonSearchTerms, setMostCommonSearchTerms] = useState<
    MostCommonSearchTerm[]
  >([])
  const [mostViewedComposites, setMostViewedComposites] = useState<
    MostViewedComposite[]
  >([])
  const [totalViews, setTotalViews] = useState<number>(0)
  const [searchTrends, setSearchTrends] = useState<any[]>([])
  const navigate = useNavigate()

  // Temporarily fake data for analytics
  const fetchAnalytics = async () => {
    try {
      // Simulate fetching data
      setTimeout(() => {
        setMetrics([
          { title: 'Total Composites Uploaded', value: 4 },
          { title: 'Total Active Programs', value: 14 }
        ])

        setMostCommonSearchTerms([
          { term: 'software', count: 7 },
          { term: 'tron', count: 2 },
          { term: '2024', count: 10 }
        ])

        setMostViewedComposites([
          { program: 'Software Engineering', year: '2024', views: 12 },
          { program: 'Mechanical Engineering', year: '2023', views: 6 },
          { program: 'Computer Science', year: '2022', views: 3 }
        ])

        setTotalViews(67)

        // Fake search trends and views over time
        setSearchTrends([
          { date: '2024-01-01', searchCount: 5, viewCount: 12 },
          { date: '2024-01-02', searchCount: 7, viewCount: 15 },
          { date: '2024-01-03', searchCount: 10, viewCount: 18 },
          { date: '2024-01-04', searchCount: 3, viewCount: 5 },
          { date: '2024-01-05', searchCount: 5, viewCount: 15 },
          { date: '2024-01-06', searchCount: 10, viewCount: 23 },
          { date: '2024-01-07', searchCount: 6, viewCount: 12 },
          { date: '2024-01-08', searchCount: 15, viewCount: 25 },
          { date: '2024-01-09', searchCount: 1, viewCount: 6 },
          { date: '2024-01-10', searchCount: 3, viewCount: 4 }
        ])
      }, 1000)
    } catch (error: any) {
      showErrorToast(`Error fetching analytics: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const handleBackToAdmin = () => {
    navigate('/admin')
  }

  // Prepare the chart data
  const lineChartData: ChartData<'line'> = {
    labels: searchTrends.map((trend) => trend.date),
    datasets: [
      {
        label: 'Search Count',
        data: searchTrends.map((trend) => trend.searchCount),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      },
      {
        label: 'View Count',
        data: searchTrends.map((trend) => trend.viewCount),
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false
      }
    ]
  }

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Dashboard Analytics</h2>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Views Card */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Total Views</h3>
          <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
        </div>

        {/* Metrics Cards */}
        {metrics.map((metric) => (
          <div key={uuidv4()} className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">
              {metric.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Most Common Search Terms */}
      <div className="mb-6 w-full">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Most Common Search Terms
        </h3>
        {mostCommonSearchTerms.length > 0 ? (
          <ul className="space-y-4">
            {mostCommonSearchTerms.map((term) => (
              <li key={uuidv4()} className="rounded-lg bg-white p-4 shadow">
                <p className="text-lg font-semibold">{term.term}</p>
                <p className="text-gray-600">Count: {term.count}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No search terms available.</p>
        )}
      </div>

      {/* Most Viewed Composites */}
      <div className="mb-6 w-full">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Most Viewed Composites
        </h3>
        {mostViewedComposites.length > 0 ? (
          <ul className="space-y-4">
            {mostViewedComposites.map((composite) => (
              <li key={uuidv4()} className="rounded-lg bg-white p-4 shadow">
                <p className="text-lg font-semibold">
                  {composite.program} - {composite.year}
                </p>
                <p className="text-gray-600">Views: {composite.views}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No viewed composites available.</p>
        )}
      </div>

      {/* Search Trends Graph */}
      <div className="mb-6 w-full">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Search Trends and View Counts
        </h3>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>

      <div className="mt-6">
        <TextButton variant="secondary" onClick={handleBackToAdmin}>
          Back to Admin
        </TextButton>
      </div>
    </div>
  )
}

export default ViewDashboardAnalyticsPage
