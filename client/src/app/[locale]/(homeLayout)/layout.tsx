import HomeNavigationBar from "@/components/layout/navigationBars/HomeNavigationBar"

function layout({
  children,
  homeHero
}: { children: React.ReactNode, homeHero: React.ReactNode }) {
  return (
    <div>

      <div className="p-7">{homeHero}</div>
      <div className="w-full flex justify-center">
        <HomeNavigationBar />
      </div>
      {children}
    </div>
  )
}

export default layout