export enum Routes {
  Main = '/',

  NotFound = '/404',
  NotFoundEmpty = '/404?t=empty',
  Coin = '/coin',
  TokenPage = '/[chain]/[address]',

  Create = '/create',

  Account = '/account',

  Reward = '/reward',

  AI = '/ai',
  AIChat = '/ai/chat',
  AIList = '/ai/agent',
  AICreate = '/ai/create',
  AIEdit = '/ai/edit',

  Feed = '/feed',
  CreateArticle = '/feed/create',
  FeedDetail = '/feed/detail',

  News = '/news',
  NewsMoonshot = '/news/tab/1',
  NewsClassicMeme = '/news/tab/2',

  Notification = '/notification',
}
