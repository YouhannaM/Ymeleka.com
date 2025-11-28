export interface Route {
  label: string;
  path: string;
  index?: boolean;
}

const routes: Route[] = [
  {
    index: true,
    label: 'Youhanna Meleka',
    path: '/',
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Projects',
    path: '/projects',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
];

export default routes;
