import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/user',
  name: 'user',
  component: LAYOUT,
  redirect: '/user/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.user'),
    orderNo: 11,
  },
  children: [
    {
      path: 'index',
      name: 'userPage',
      component: () => import('/@/views/user/index.vue'),
      meta: {
        title: t('routes.dashboard.user'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
