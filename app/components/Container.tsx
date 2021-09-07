/*
  A centralized container with max width
*/
const Container: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="mx-5">{children}</div>
    </div>
  )
}

export default Container
