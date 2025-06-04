export type Language = 'en' | 'zh';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    discover: 'Discover',
    library: 'Library',
    settings: 'Settings',
    researchBeginsHere: 'Research begins here.',
    libraryTitle: 'Library',
    noChatsFound: 'No chats found.',
    theme: 'Theme',
    language: 'Language',
    automaticImageSearch: 'Automatic Image Search',
    automaticallySearchImages: 'Automatically search for relevant images in chat responses',
    ago: 'ago',
  },
  zh: {
    home: '首页',
    discover: '发现',
    library: '知识库',
    settings: '设置',
    researchBeginsHere: '研究从这里开始。',
    libraryTitle: '知识库',
    noChatsFound: '未找到聊天记录。',
    theme: '主题',
    language: '语言',
    automaticImageSearch: '自动图片搜索',
    automaticallySearchImages: '自动在聊天回复中搜索相关图片',
    ago: '前',
  },
};
