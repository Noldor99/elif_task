import { useGetUser } from "@/ahooks/useUser"
import Search from "@/components/Search"
import { UserCard } from "@/components/UserCard"
import WrapChart from "@/components/WrapChart"
import WrapPagination from "@/components/WrapPagination"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const User = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const getResult = useGetUser({
    enabled: true,
    params: {
      limit: "8",
      page: searchParams.get("page") || "1",
      search: searchParams.get("search") || undefined,
    },
  })

  const { data: userData, refetch } = getResult

  useEffect(() => {
    refetch()
    window.scrollTo(0, 0)
  }, [refetch, searchParams])

  return (
    <div className="container">
      <WrapChart />
      <Button
        variant="black_out"
        onClick={() => navigate("/")}
        className="mb-5 w-full sm:w-min"
      >
        Home
      </Button>
      <div className="paper-sharp mb-4">
        <Search />
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
        )}
      >
        {userData?.users.map((item, idx) => (
          <UserCard key={idx} user={item} />
        ))}
      </div>
      {userData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {userData && userData.totalCount > 6 && (
        <div className="mt-8">
          <WrapPagination totalCount={userData?.totalCount} />
        </div>
      )}
    </div>
  )
}

export default User
