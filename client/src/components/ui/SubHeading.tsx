interface  Props {
    title: string;
    description: string
}
export const SubHeading: React.FC<Props> = ({
    title,
    description
}) => {
  return (
    <div className="mt-0 ">
        <h2 className="text-1.5xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
