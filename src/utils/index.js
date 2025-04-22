import { Pages } from "../pages"

export const Navlist = [
  {
    id: 1,
    name: "Главная", 
    path: "/",
    icon: require("../assets/icons/home.svg").default,
    activeIcon: require("../assets/icons/home_active.svg").default
  },
  {
    id: 2,
    name: "Уведомления", 
    path: "/notifications/",
    icon: require("../assets/icons/bell.svg").default,
    activeIcon: require("../assets/icons/bell_active.svg").default
  },
  {
    id: 3,
    name: "Задачи", 
    path: "/tasks/",
    icon: require("../assets/icons/tasks.svg").default,
    activeIcon: require("../assets/icons/tasks_active.svg").default
  },
  {
    id: 4,
    name: "Профиль", 
    path: "/profile/",
    icon: require("../assets/icons/profile.svg").default,
    activeIcon: require("../assets/icons/profile_active.svg").default
  },
]

export const PUBLIC_ROUTES = [
  {
    id: 1,
    route: "/",
    page: <Pages.Home />,
  },
  {
    id: 2,
    route: "/notifications/",
    page: <Pages.Notifications />,
  },
  {
    id: 3,
    route: "/tasks/",
    page: <Pages.Tasks />,
  },
  {
    id: 4,
    route: "/profile/",
    page: <Pages.Profile />,
  },
  {
    id: 5,
    route: "/login/",
    page: <Pages.Login />,
  },
  {
    id: 6, 
    route: "/task/",
    page: <Pages.TaskInfo />
  }, 
  {
    id: 7, 
    route: '/workers/',
    page: <Pages.Workers />
  }, 
  {
    id: 8, 
    route: '/attendance/',
    page: <Pages.Attendance />
  }, 
  {
    id: 9,
    route: '/addWorker/',
    page: <Pages.AddWorker />
  }
]