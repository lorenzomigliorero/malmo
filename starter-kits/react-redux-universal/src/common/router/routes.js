import Foo from '@/containers/Foo';
import Bar from '@/containers/Bar';
import NotFound from '@/containers/NotFound';

export default [
  {
    key: 0,
    path: '/',
    component: Foo,
    fetchData: Foo.fetchData,
    exact: true,
  },
  {
    key: 1,
    path: '/bar',
    component: Bar,
    fetchData: Bar.fetchData,
  },
  {
    key: 3,
    component: NotFound,
  },
];
