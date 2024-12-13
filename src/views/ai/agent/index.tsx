import { aiApi } from '@/api/ai'
import {
  AgentInfoResDataBase,
  AgentListReq,
  AgentListResItem,
  AgentSessionsList,
} from '@/api/ai/type'
import PrimaryLayout from '@/components/layouts/primary'
import { ListLoading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { defaultUserId } from '@/config/base'
import { defaultAgentLogo } from '@/config/link'
import { staticUrl } from '@/config/url'
import { cn } from '@/lib/utils'
import { Routes } from '@/routes'
import { useAIAgentStore } from '@/stores/use-chat-store'
import { useInfiniteScroll } from 'ahooks'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa'
import { AgentDeleteDialog } from '../components/agent-delete-dialog'
import { useUserStore } from '@/stores/use-user-store'

interface Result {
  list: AgentInfoResDataBase[]
  noMore: boolean
}

const AgentList = () => {
  const { t } = useTranslation()
  const { query, push, replace } = useRouter()
  const { setAgentInfo } = useAIAgentStore()
  const { userInfo } = useUserStore()
  const [delAgent, setDelAgent] = useState<AgentInfoResDataBase | undefined>(
    undefined
  )

  const isAll = !query.type || query.type === '1'

  const getLoadMoreList = async (s: Result | undefined): Promise<Result> => {
    let start = Math.floor((s?.list.length || 0) / 20) + 1
    const bodyData: AgentListReq = {
      page: start,
      limit: 20,
    }

    if (!isAll && userInfo?.user.id) {
      bodyData.user_id = userInfo?.user.id
    }

    const { data } = await aiApi.getAgentList(bodyData)

    return {
      list: data,
      noMore: data.length !== 20,
    }
  }

  const { data, loading, loadingMore, reload, mutate } =
    useInfiniteScroll<Result>(getLoadMoreList, {
      target: document,
      isNoMore: (d) => d?.noMore === true,
    })

  const reloadList = () => {
    mutate({
      list: [],
      noMore: true,
    })
    reload()
  }

  useEffect(() => {
    if (!isAll && userInfo?.user.id) {
      reloadList()
    }
  }, [query.type, userInfo])

  return (
    <div className="max-w-[800px] w-[80%] mx-auto pt-8">
      <div className="flex justify-between items-center text-xl">
        {t('agent.list')}
        <Button
          onClick={() => {
            setAgentInfo(undefined)
            push(Routes.AICreate)
          }}
        >
          {t('create.agent')}
        </Button>
      </div>

      <div className="mt-1">
        <Button
          className="!px-8"
          variant={isAll ? 'purple' : 'secondary'}
          onClick={() => {
            replace(`${Routes.AIList}?type=1`)
          }}
        >
          {t('all')}
        </Button>
        <Button
          className="ml-5 !px-8"
          variant={!isAll ? 'purple' : 'secondary'}
          onClick={() => {
            replace(`${Routes.AIList}?type=2`)
          }}
        >
          {t('my')}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {data?.list.map((agent) => {
          return (
            <Card
              key={agent.agent_id}
              onClick={() => {
                push(`${Routes.AIChat}/${agent.agent_id}`)
              }}
            >
              <CardContent className="p-3">
                <div className="flex">
                  <img
                    src={
                      agent.logo
                        ? `${staticUrl}${agent.logo}`
                        : defaultAgentLogo
                    }
                    alt="Logo"
                    width={72}
                    height={72}
                    className="w-[72px] h-[72px] rounded-md object-cover"
                  />
                  <div className="flex-1 flex flex-col justify-between ml-2">
                    <div
                      className={cn(
                        !isAll
                          ? 'flex justify-between items-center w-full'
                          : null
                      )}
                    >
                      <span className="line-clamp-1 break-all">
                        {agent.name}
                      </span>
                      {!isAll ? (
                        <div className="flex items-center space-x-1">
                          <div
                            className="ml-2 flex items-center space-x-1 text-nowrap text-sm rounded-full px-2 hover:opacity-50 transition-all"
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              setAgentInfo(agent)
                              push(`${Routes.AIEdit}/${agent.agent_id}`)
                            }}
                          >
                            {/* <span className="text-purple-500">
                              {t('edit.agent')}
                            </span> */}
                            <FaRegEdit
                              className="text-purple-500"
                              size={20}
                            ></FaRegEdit>
                          </div>

                          <div>
                            <RiDeleteBin6Line
                              className="text-red-500  hover:opacity-50 "
                              size={20}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setDelAgent(agent)
                              }}
                            ></RiDeleteBin6Line>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={cn(
                        'line-clamp-1 break-all text-sm text-gray-500',
                        '-translate-y-[2px]'
                      )}
                    >
                      {agent.description}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {/* @{agent.user_id} */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {loading || loadingMore ? (
        <ListLoading />
      ) : data?.noMore && !data.list.length ? (
        <span>{t('no.have.agent')}</span>
      ) : null}

      <AgentDeleteDialog
        delAgent={delAgent}
        setDelAgent={setDelAgent}
        onDeleted={reloadList}
      />
    </div>
  )
}

AgentList.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default AgentList
