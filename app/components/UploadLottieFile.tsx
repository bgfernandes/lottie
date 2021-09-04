import { gql, useApolloClient, useMutation } from '@apollo/client'
import { ChangeEvent } from 'react'

const UPLOAD_LOTTIE_MUTATION = gql`
  mutation uploadLottieFile($file: Upload!) {
    uploadLottieFile(file: $file) {
      slug
    }
  }
`

export function UploadLottieFile({ onUpload }: { onUpload: (_slug: string) => any } ) {
  const [uploadFileMutation, { loading, error }] = useMutation(UPLOAD_LOTTIE_MUTATION)
  const apolloClient = useApolloClient()

  const onChange = ({
    target: {
      validity,
      files,
    }
  }: ChangeEvent<HTMLInputElement>) => {
    validity.valid && files &&files[0] &&
    uploadFileMutation({ variables: { file: files[0] } }).then(({ data }) => {
      apolloClient.resetStore()
      onUpload(data.uploadLottieFile.slug)
    })
  }

  let message = 'Choose a file to upload'

  if (loading) {
    message = 'Loading'
  } else if (error) {
    message = error.message
    console.log(JSON.stringify(error))
  }

  return (
    <div>
      {message}
      <br />
      <input type="file" required onChange={onChange} />
    </div>
  )
}
