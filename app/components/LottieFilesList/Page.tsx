import { LottieFile } from '../../types'
import Card from './Card'

type PageProps = {
  lotties: [LottieFile]
}

/*
  A list of lotties with pagination
  Will show as a grid in bigger screens
*/
export default function Page({ lotties }: PageProps) {
  return (
    <div className="flex flex-wrap">
      {lotties.map((lottie) => {
        return <Card key={lottie.id} lottie={lottie} />
      })}
    </div>
  )
}
