import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'home.tsx', [
    route('pokemon/:name', './views/CardDetails/CardDetails.tsx'),
  ]),
  route('/*', './views/NotFound/NotFound.tsx'),
] satisfies RouteConfig;
