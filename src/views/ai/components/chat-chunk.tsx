export const ChatChunk = () => {
  return (
    <div className="mb-4">
      {/* USER */}
      <div className="flex items-start justify-end">
        <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
          {item.message.content}
        </div>
        <Avatar className="w-8 h-8 ml-2"></Avatar>
      </div>

      {/* AI */}
      <div className="flex items-start mt-4 mb-2">
        <Avatar
          src={
            agentInfo?.logo ? `${staticUrl}${agentInfo.logo}` : agentLogoDefault
          }
          className="w-8 h-8 mr-2"
        ></Avatar>
        <div className="bg-gray-800 text-primary rounded-lg p-3 max-w-[80%]">
          <ReactMarkdown>{item.response.content}</ReactMarkdown>
          {loading && index === sessions.length - 1 ? (
            <img src={loadingSVG} width={20} height={20}></img>
          ) : null}
        </div>
      </div>
    </div>
  )
}
