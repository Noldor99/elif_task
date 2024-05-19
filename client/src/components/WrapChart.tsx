import { useState, useEffect } from "react"
import UserRegistrationChart from "./UserRegistrationChart"
import { apiUser } from "@/actions/client/userAction"
import { IUser } from "@/types/user"

interface UserData {
  date: string
  count: number
}

const WrapChart = () => {
  const [data, setData] = useState<UserData[]>([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiUser.getAll({
          limit: "8000",
        })
        const userData: IUser[] = response.users

        const registrationCount: { [key: string]: number } = {}

        userData.forEach((user) => {
          const date = user.createdAt.split("T")[0]
          if (registrationCount[date]) {
            registrationCount[date]++
          } else {
            registrationCount[date] = 1
          }
        })

        const formattedData: UserData[] = Object.entries(registrationCount).map(
          ([date, count]) => ({ date, count })
        )

        setData(formattedData.reverse())
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div>
      <h1>User Registration Statistics</h1>
      <UserRegistrationChart data={data} />
    </div>
  )
}

export default WrapChart
