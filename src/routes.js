import Dashboard from "views/Dashboard";
import LinkRecs from "views/LinkRecs";
import UserUpdate from "views/UserUpdate";
import ArtRecDate from "views/ArtRecDate";
import Vocab from "views/Vocab";

var routes = [
  {
    path: "/dashboard",
    name: "Recommendations",
    icon: "nc-icon nc-single-copy-04",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/link_history",
    name: "History",
    icon: "nc-icon nc-box",
    component: ArtRecDate,
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
    path: "/vocab",
    name: "Vocabulary Test",
    icon: "nc-icon nc-ruler-pencil",
    component: Vocab,
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
