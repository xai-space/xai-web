import { ComponentProps, useEffect, useState } from 'react'
import { IoLanguageOutline } from 'react-icons/io5'
import {
  RiNotification3Line,
  RiRobot2Fill,
  RiRobot2Line,
  RiRocketFill,
  RiRocketLine,
} from 'react-icons/ri'
import { AiOutlineHome } from 'react-icons/ai'
import { RiNotification3Fill } from 'react-icons/ri'
import { FaCaretDown, FaRegUser } from 'react-icons/fa6'
import { FaUser } from 'react-icons/fa6'
import { BsPeople } from "react-icons/bs";
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/use-user-store'
import { useLang } from '@/hooks/use-lang'
import { cn } from '@/lib/utils'
import { Routes } from '@/routes'
import { officialLinks } from '@/config/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { joinPaths } from '@/utils'
import { get } from 'lodash-es'
import { useResponsive } from '@/hooks/use-responsive'
import Logo from '@/components/logo'
import SocialLinks from '@/components/social-links'
import NavAccount from './nav-account'
import { useAIAgentStore } from '@/stores/use-chat-store'
import { UserCategory } from '@/api/user/types'
import { getUnreadNotices } from '@/api/user'
import { useRequest } from 'ahooks'
import { PostMenu } from '@/components/post-menu'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { AiOutlinePicture } from "react-icons/ai";
import { RiHome4Fill } from "react-icons/ri";
import { RiHome4Line } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { TbSettingsFilled } from "react-icons/tb";
import { MoreMenus } from './components/more-menus'
import { useChartStore } from '@/stores/use-chart-store'
interface Props {
  collapseSize?: keyof ReturnType<typeof useResponsive>
}

export const NavAside = ({
  className,
  collapseSize = 'isLaptop',
  ...props
}: ComponentProps<'div'> & Props) => {
  const { t, i18n } = useTranslation()
  const { setLang } = useLang()
  const { pathname, ...router } = useRouter()
  const { userInfo } = useUserStore()
  const responsive = useResponsive()
  const { setNoticeCount, noticeCount } = useChartStore()
  const [isCollapsed, setIsCollapsed] = useState(responsive[collapseSize])
  const [isOpenMoreMenus, setIsOpenMoreMenus] = useState(false)
  const { agentInfo, sessionId } = useAIAgentStore()
  console.log("pathname&&:", pathname);

  const userNavs = [
    {
      title: t('profile'),
      path: joinPaths(
        Routes.Account,
        userInfo?.user_id || '',
        `?t=${UserCategory.User}`
      ),
      icon: <FaRegUser />,
      iconActive: <FaUser />,
      isActive: pathname.includes(Routes.Account),
    },
  ]

  const navs = [
    {
      title: t('home'),
      path: Routes.Main,
      icon: <RiHome4Line size={28} />,
      iconActive: <RiHome4Fill size={28} />,
      isActive: pathname === Routes.Main,
    },
    {
      title: t('nft-agent'),
      path: Routes.NftAgent,
      icon: <AiOutlinePicture size={28} />,
      iconActive: <AiFillPicture size={28} />,
      isActive: pathname === Routes.NftAgent,
    },
    {
      title: t('ai-agent'),
      path: sessionId
        ? `${Routes.AIChat}/${agentInfo?.agent_id}?sid=${sessionId}`
        : Routes.AIList,
      icon: <RiRobot2Line size={28} />,
      iconActive: <RiRobot2Fill size={28} />,
      isActive: pathname.startsWith(Routes.AI),
    },
    {
      title: t('coin'),
      path: Routes.Coin,
      icon: <RiRocketLine size={28} />,
      iconActive: <RiRocketFill size={28} />,
      isActive: pathname === Routes.Coin,
    },
    {
      title: t('nav.community'),
      path: Routes.Community,
      icon: <BsPeople size={28} />,
      iconActive: <BsFillPeopleFill size={28} />,
      isActive: pathname === Routes.Community,
    },
    {
      title: t('Notification'),
      id: 'notice',
      path: Routes.Notification,
      icon: <RiNotification3Line size={28} />,
      iconActive: <RiNotification3Fill size={28} />,
      isActive: pathname === Routes.Notification,
    },
    {
      title: t('profile'),
      path: Routes.Profile,
      icon: <BiUser size={28} />,
      iconActive: <BiSolidUser size={28} />,
      isActive: pathname === '/account/[uid]',
    },
    {
      title: t('setting'),
      path: Routes.Setting,
      icon: <TbSettings size={28} />,
      iconActive: <TbSettingsFilled size={28} />,
      isActive: pathname === Routes.Setting,
    },
    {
      title: t('nav.more'),
      path: '',
      icon: <MoreMenus isCollapsed={true} isOpen={isOpenMoreMenus} setIsOpen={setIsOpenMoreMenus} />,
      iconActive: <MoreMenus isCollapsed={true} />,
      isActive: false,
    },
  ]

  useEffect(() => {
    setIsCollapsed(responsive[collapseSize])
  }, [responsive, collapseSize])


  return (
    <aside
      className={cn(
        'flex flex-col space-y-4 w-52 pt-2 select-none relative h-screen justify-between',
        isCollapsed && 'w-10 items-center',
        className
      )}
      {...props}
    >
      <div>
        <div className="flex justent-end rounded-full">
          <Logo
            showMeme
            showLogo={!isCollapsed}
            className="w-28"
            linkClass={isCollapsed ? 'relative flex item-center' : 'relative'}
            betaClass={isCollapsed ? 'absolute -bottom-5 ml-1' : ''}
          />
        </div>
        <div
          className={cn(
            'pt-2 space-y-3',
            isCollapsed && 'mt-5 flex flex-col items-center'
          )}
        >
          <NavigationMenu className="grid grid-cols-1 mb-4  max-w-full">
            <NavigationMenuList
              className={cn(
                'grid grid-cols-1 space-x-0',
                isCollapsed && 'space-y-2'
              )}

            >
              {navs.map((n, i) => (
                <NavigationMenuItem
                  key={i}
                  className={cn('w-full', isCollapsed && 'w-auto')}
                >
                  <NavigationMenuLink
                    className={cn(
                      'relative flex justify-start rounded-full py-[25px] cursor-pointer font-normal hover:bg-[#e7e7e8]',
                      n.isActive && 'font-semibold',
                      isCollapsed &&
                      'border-[10px] space-x-0 p-0 justify-center text-xl'
                    )}
                    onClick={() => {
                      if (n.path === '') {
                        // openMoreMenus()
                        setIsOpenMoreMenus(true)
                        return
                      }
                      if (n.path === Routes.Profile) {
                        router.push(`${Routes.Account}/${userInfo?.user_id}?t=${UserCategory.User}`)
                        return
                      }
                      router.push(n.path)
                    }}
                    title={n.title}
                  >
                    <div className="mr-[14px]">
                      {n.isActive ? n.iconActive : n.icon}
                    </div>
                    {n.id === 'notice' &&

                      noticeCount > 0 && (
                        <div
                          className={cn(
                            'absolute top-[3px] left-[29px] min-w-[18px] h-[18px] flex px-1 justify-center items-center text-center text-white rounded-full text-[10px] bg-[#4a99e8]'
                          )}
                        >
                          {noticeCount > 99
                            ? '99+'
                            : noticeCount}
                        </div>
                      )}
                    {!isCollapsed && (
                      <span className="text-[#0f1419] block ml-[10px] text-[20px]">
                        {n.title}
                      </span>
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* ---0-p-p */}
          {/* <div
            className={cn(
              'flex justify-between items-center ml-[17px]',
              isCollapsed && 'flex-col justify-center space-x-0 space-y-2'
            )}
          >
            <div
              className={cn(
                'flex justify-center items-center space-x-1',
                className
              )}
              {...props}
            >
              <Button
                type="button"
                size={isCollapsed ? 'icon' : 'icon-lg'}
                title={t('change.language')}
                onClick={() =>
                  i18n.language === 'en' ? setLang('zh') : setLang('en')
                }
                className="border-transparent text-white bg-black sm:hover:border-black w-full"
              >
                <IoLanguageOutline size={20} />
              </Button>
            </div>

            <SocialLinks
              x={officialLinks.x}
              tg={officialLinks.tg}
              whitepaper={officialLinks.whitepaper}
              size={20}
              buttonProps={{
                size: isCollapsed ? 'icon' : 'icon-lg',
                className: isCollapsed
                  ? 'w-full bg-black text-white'
                  : 'bg-black text-white',
              }}
            />
          </div> */}

          <PostMenu isCollapsed={isCollapsed} />
        </div>
      </div>

      <div
        className={cn('flex flex-col items-start pb-5', !userInfo && 'w-full')}
      >
        <NavAccount userInfo={userInfo} isCollapsed={isCollapsed} />


      </div>
    </aside>
  )
}
