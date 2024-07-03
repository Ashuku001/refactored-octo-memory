interface  Props {
    title: string;
    description: string
}
const Heading: React.FC<Props> = ({
    title,
    description
}) => {
  return (
    <div className="mt-0 ">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Heading