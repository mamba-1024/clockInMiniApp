export default defineAppConfig({
  pages: [
    'pages/clockIn/index',
    'pages/attendance/index',
    'pages/index/index',
  ],
  tabBar: {
    color: '#707070',
    selectedColor: '#60A5FA',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/clockIn/index',
        text: '打卡',
        iconPath: './assets/image/attendance-bar.png',
        selectedIconPath: './assets/image/attendance-bar-selected2.png'
      },
      {
        pagePath: 'pages/attendance/index',
        text: '考勤',
        iconPath: './assets/image/home-bar.png',
        selectedIconPath: './assets/image/home-bar-selected2.png'
      },
      {
        pagePath: 'pages/index/index',
        text: '我的',
        iconPath: './assets/image/my-bar.png',
        selectedIconPath: './assets/image/my-bar-selected2.png'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
