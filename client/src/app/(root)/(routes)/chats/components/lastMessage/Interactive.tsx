import Text from "./text";

type InteractiveMessageProps  = {
  interactive: {
    type: string;
    button?: {body: string};
    list?: {body: string; button: string;}
    template?: {body: string}
  }
}

const InteractiveMessage = ({interactive}: InteractiveMessageProps) => {
  return (
    <>
      {interactive?.type === 'BUTTON' &&
      <div>
        <Text text={interactive?.button?.body} />
      </div>
      }
      {interactive?.type === 'LIST' &&
      <div>
        <Text text={interactive?.list?.body} />
      </div>
      }
      {interactive?.type === 'TEMPLATE' &&
      <div>
        <Text text={interactive?.template?.body} />
      </div>
      }
    </>
  )
};

export default InteractiveMessage;
