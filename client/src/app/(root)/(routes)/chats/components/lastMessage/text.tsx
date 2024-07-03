type Props = {
    text?: string
}

function Text({text}: Props) {
  return (
    <p className="break-words line-clamp-1">
      {text}
    </p>
  )
}

export default Text
