import moment from 'moment'
import { LottieFile } from  '../types'

// Placeholder show lottie file component
export function ShowLottieFile({ lottieFile }: { lottieFile: LottieFile }) {
  return (
    <div>
      Slug: { lottieFile.slug }
      <br />
      Url: { lottieFile.url }
      <br />
      Created At: { moment.unix(parseInt(lottieFile.createdAt!)).utc().toString() }
      <br />
      Last Updated At: { moment.unix(parseInt(lottieFile.updatedAt!)).utc().toString() }
    </div>
  )
}
