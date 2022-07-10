// ** Routes Imports
import AppRoutes from "./Apps";
import FormRoutes from "./Forms";
import PagesRoutes from "./Pages";
import TablesRoutes from "./Tables";
import ChartMapsRoutes from "./ChartsMaps";
import DashboardRoutes from "./Dashboards";
import UiElementRoutes from "./UiElements";
import ExtensionsRoutes from "./Extensions";
import PageLayoutsRoutes from "./PageLayouts";
import CEPRoutes from "./CEP.js";
import DigitalServices from "./DigitalServices";
import Applications from "./Applications";
import Settings from "./Settings";
import Logs from "./Logs";

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/monachus/analytics";

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartMapsRoutes,
  ...CEPRoutes,
  ...DigitalServices,
  ...Applications,
  ...Settings,
  ...Logs
];

export { DefaultRoute, TemplateTitle, Routes };
