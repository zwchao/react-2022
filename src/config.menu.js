/**
 * @file: /react-2022/src/config.menu.js
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */
 export const menuList = [
    {
      label: 'test1',
      icon: 'icon-layout-masonry-fill',
      link: '/test1',
    },
    {
      label: 'test2',
      icon: 'icon-building-4-fill',
      children: [
        { label: 'page1', link: '/test2/page1' },
      ],
    }
  ];