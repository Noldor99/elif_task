import React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface UserRegistrationChartProps {
  data: { date: string; count: number }[]
}

const UserRegistrationChart: React.FC<UserRegistrationChartProps> = ({
  data,
}) => {
  const chartData = {
    labels: data.map((item) => item.date), // Extract dates
    datasets: [
      {
        label: "Number of Registered Users",
        data: data.map((item) => item.count), // Extract counts
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Registrations Over Time",
      },
    },
  }

  return <Line data={chartData} options={options} />
}

export default UserRegistrationChart
