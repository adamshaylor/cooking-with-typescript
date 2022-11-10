type RouteName =
  'login' |
  'home' |
  'logout'

/**
 * This would sort of work, but leaves open the possibility of
 * copy/paste errors in the `name` properties.
 */

// interface Route {
//   name: RouteName
//   path: string
//   iconName: string
//   publicTitle: string
// }

// type Routes = Record<RouteName, Route>

/**
 * We can save ourselves from the `name` footgun. Using `extends`
 * inside a generic this way requires that `name` is a
 * `RouteName`. That gets us halfway...
 */

interface Route<Name extends RouteName> {
  name: Name
  path: string
  iconName: string
  publicTitle: string
}

/**
 * ...And the second half is typing the index signature of our `Routes`
 * record to enforce parity between the keys of the outer object and
 * the `name` property of the inner objects.
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
   * Now there's no way we can make this mistake!
   */

  // logout: {
  //   name: 'login',
  //   path: '/logout',
  //   iconName: 'doorClosing',
  //   publicTitle: 'Log out'
  // }

  login: {
    name: 'login',
    path: '/login',
    iconName: 'doorOpening',
    publicTitle: 'Log in'
  },
  home: {
    name: 'home',
    path: '/',
    iconName: 'house',
    publicTitle: 'Home'
  },

  /**
   * What happens if we were to remove one of these? Or one of its
   * properties?
   */

  logout: {
    name: 'logout',
    path: '/logout',
    iconName: 'doorClosing',
    publicTitle: 'Log out'
  }
};
