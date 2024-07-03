
import ButtonAdForm from './components/ButtonAdForm';
type Props = {
  params: {
    adId: string
  }
}
const page = async ({ params: { adId } }: Props) => {
  return (
    <div className="flex-1 space-y-4 pt-1">
      <ButtonAdForm  />
    </div>
  )
}

export default page