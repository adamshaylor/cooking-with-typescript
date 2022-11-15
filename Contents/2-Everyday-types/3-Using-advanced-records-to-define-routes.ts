/**
 * Let's say we have a route-based application.
 */

type RouteName =
  'login' |
  'home' |
  'logout'

/**
 * A first effort at defining the data associated with our routes might
 * look like this.
 */

// interface Route {
//   name: RouteName
//   path: string
//   iconName: string
//   publicTitle: string
// }

// type Routes = Record<RouteName, Route>

/**
 * However, there is nothing preventing a key in `Routes` from
 * diverging from the `name` property of its value. To save ourselves
 * from that footgun, we can use generics.
 */

interface Route<Name extends RouteName> {
  name: Name
  path: string
  iconName: string
  publicTitle: string
}

/**
 * And with that generic, we can define the index signature of our
 * `Routes` record to enforce parity between the keys of the outer
 * object and the `name` property of the inner objects.
 */

type Routes = {
  [Name in RouteName]: Route<Name>
}

/**
 * Now we have rigorously defined routes. The names are all just
 * strings at runtime, but they're type-safe strings.
 */

const routes: Routes = {
  /**
   * Now there's no way we can make this kind of copy-paste error!
   */
  // login: {
  //   name: 'logout',
  //   path: '/login',
  //   iconName: 'doorOpening',
  //   publicTitle: 'Log in'
  // },

  login: {
    name: 'login',
    path: '/login',
    iconName: 'doorOpening',
    publicTitle: 'Log in'
  },
  logout: {
    name: 'logout',
    path: '/logout',
    iconName: 'doorClosing',
    publicTitle: 'Log out'
  },
  home: {
    name: 'home',
    path: '/',
    iconName: 'house',
    publicTitle: 'Home'
  }
};
