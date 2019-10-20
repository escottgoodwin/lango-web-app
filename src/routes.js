import Dashboard from "views/Dashboard";
import LinkRecs from "views/LinkRecs";
import UserUpdate from "views/UserUpdate";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/link_recs",
    name: "Link Recommendations",
    icon: "nc-icon nc-diamond",
    component: LinkRecs,
    layout: "/admin"
  },
  {
    path: "/update_user",
    name: "Update User",
    icon: "nc-icon nc-circle-10",
    component: UserUpdate,
    layout: "/admin"
  },
];
export default routes;
