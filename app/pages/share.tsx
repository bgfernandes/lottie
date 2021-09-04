import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { UploadLottieFile } from '../components/UploadLottieFile'

const Share: NextPage = () => {
  const router = useRouter()

  const onUpload = (slug: string) => {
    router.push('lotties/' + slug)
  }

  return <UploadLottieFile onUpload={onUpload} />
}

export default Share
