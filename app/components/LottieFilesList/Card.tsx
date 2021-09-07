import { Player } from '@lottiefiles/react-lottie-player'
import { LottieFile } from '../../types'

type CardProps = {
  lottie: LottieFile
}

export default function Card({ lottie }: CardProps) {
  return (
    <div className="w-full md:w-1/3 flex flex-col py-6 md:p-6">
      <div className="lf-box trans trans-slow hover:shadow-md relative">
        <Player
          autoplay
          loop
          style={{ height: '270px', width: '100%' }}
          src={lottie.url as string}
        />
      </div>
    </div>
  )
}
