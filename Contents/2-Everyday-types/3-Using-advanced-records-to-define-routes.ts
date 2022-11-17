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
 * Now let's build an object constant that *satisfies* our `Routes`
 * type but still allows us to treat its contents as a type.
 */

const routes = {
  /**
   * This is where our generic `Route` comes in handy. There's no way
   * we can make this sort of copy/paste error.
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
} as const satisfies Routes;

/**
 * Now we can dynamically generate path types to ensure that all the
 * links inside our app work...
 */

type Path = (typeof routes)[RouteName]['path'];

/**
 * ...and save ourselves from typos like this.
 */

// const logoutLink: Path = '/loguot';
