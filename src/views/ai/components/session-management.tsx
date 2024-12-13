import { AgentSessionsList } from '@/api/ai/type'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Routes } from '@/routes'
import { useAIAgentStore } from '@/stores/use-chat-store'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronDown } from 'react-icons/fa6'
import { FiEdit3 } from 'react-icons/fi'
import { IoIosMore } from 'react-icons/io'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { SessionRenameDialog } from './session-rename-dialog'
import { cn } from '@/lib/utils'
import { SessionDeleteDialog } from './session-delete-dialog'
import { defaultUserId } from '@/config/base'
import { useInfiniteScroll } from 'ahooks'
import { aiApi } from '@/api/ai'

interface Result {
  list: AgentSessionsList[]
  noMore: boolean
}

export const SessionManagement = () => {
  const [session, setSession] = useState<AgentSessionsList>()
  const [delSession, setDelSession] = useState<AgentSessionsList>()
  const [show, setShow] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation()
  const { sessionId, agentInfo, sessionList, setSessionId, setSessionList } =
    useAIAgentStore()
  const { query, push } = useRouter()

  const onChangeSessionId = (id: string) => {
    setSessionId(id)
    push(`${Routes.AIChat}/${query.id}?sid=${id}`)
  }

  const getLoadMoreList = async (): Promise<Result> => {
    let start = Math.floor(sessionList.length / 10) + 1

    const { data } = await aiApi.getSessionList(agentInfo!.agent_id, start)

    setSessionList(sessionList.concat(data))

    return {
      list: data,
      noMore: data.length !== 10,
    }
  }

  const { data, loading, loadingMore, loadMore } = useInfiniteScroll(
    () => getLoadMoreList(),
    {
      target: menuRef,

      isNoMore: (d) => {
        return d?.noMore === true
      },
    }
  )

  if (!sessionList?.length) return <></>

  return (
    <>
      <DropdownMenu open={show} onOpenChange={setShow}>
        <DropdownMenuTrigger>
          <Button variant="outline" onClick={() => setShow(true)}>
            {t('history.list')}
            <FaChevronDown className="ml-1"></FaChevronDown>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          ref={menuRef}
          className="w-56 max-h-40 overflow-y-scroll"
        >
          <DropdownMenu>
            {sessionList?.map((session) => {
              return (
                <DropdownMenuItem
                  className={cn(
                    'cursor-pointer',
                    session.session_id === sessionId
                      ? 'bg-gray-700 hover:bg-gray-800'
                      : ''
                  )}
                  onClick={() => {
                    onChangeSessionId(session.session_id)
                  }}
                >
                  <div className="w-full flex justify-between ">
                    <span
                      className="max-w-[80%] truncate"
                      title={session.title}
                    >
                      {session.title}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <IoIosMore
                          className="hover:text-gray-300 cursor-pointer"
                          size={20}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            setSession(session)
                            setShow(false)
                          }}
                        >
                          <FiEdit3 className="mr-1" />
                          {t('rename')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={(e) => {
                            setDelSession(session)
                            setShow(false)
                          }}
                        >
                          <RiDeleteBin5Line className="mr-1" />
                          {t('del')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </DropdownMenuItem>
              )
            })}
            {sessionList.length === 10 ? (
              <DropdownMenuItem
                onClick={() => {
                  !loadingMore && loadMore()
                }}
                className="underline cursor-pointer"
              >
                {loadingMore ? t('loading') : t('more...')}
              </DropdownMenuItem>
            ) : null}
          </DropdownMenu>
          {/* <DropdownMenuItem>{t('check.all')}</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <SessionRenameDialog session={session} setSession={setSession} />
      <SessionDeleteDialog
        delSession={delSession}
        setDelSession={setDelSession}
      />
    </>
  )
}
