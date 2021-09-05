import { NextPage } from 'next'
import LottieFilesList from '../components/LottieFilesList'

const RecentPage: NextPage = () => {
  return (
    <div className="container mx-auto mb-10">
      <LottieFilesList />
    </div>
  )
}

export default RecentPage
