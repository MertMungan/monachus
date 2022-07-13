// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import chat from '@src/views/apps/chat/store/reducer'
import todo from '@src/views/apps/todo/store/reducer'
import users from '@src/views/apps/user/store/reducer'
import email from '@src/views/apps/email/store/reducer'
import invoice from '@src/views/apps/invoice/store/reducer'
import calendar from '@src/views/apps/calendar/store/reducer'
import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import dataTables from '@src/views/tables/data-tables/store/reducer'

// NEW QUERY
import query from './query/index'
import treeconfig from './treeConfig/index'
import fields from './fields'
import searchReducer from './search'
import collectionsReducer from './collections'
import collectionsDataReducer from './collectionsData'
import recommeditionUsersReducer from './recommeditionUsers'
import recommeditionItemsReducer from './recommeditionItems'
import notificationFirebaseReducer from './notificationFirebase'
import notificationSmtpReducer from './notificationSmtp'
import notificationTopicReducer from './notificationTopic'
import notificationTemplatesReducer from './notificationTemplates'
import notificationEmailTemplatesReducer from './notificationEmailTemplates'
import notificationUsersReducer from './notificationUsers'
import messagingTemplatesReducer from './notificationMessagingTemplates'
import tableRowsReducer from './table'
import journeyReducer from './journey'
import journeyOptionsReducer from './journeyOptionsReducer'
import ruleCategoryReducer from './ruleCategory'
import usersReducer from './users'
import rolesReducer from './roles'
import keycloakUsersReducer from './keycloakUsers'
import keycloakTokenReducer from './keycloakToken'
import keycloakRolesReducer from './keycloakRoles'
import keycloakRolesClinetReducer from './keycloakClientRoles'
import keycloakUsersWithRolesReducer from './keycloakUsersWithRoles'
// ** Root Reducer
const rootReducer = combineReducers({
  auth,
  todo,
  chat,
  email,
  users,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  query,
  treeconfig,
  fields,
  search: searchReducer,
  collectionsReducer,
  collectionsDataReducer,
  recommeditionUsersReducer,
  recommeditionItemsReducer,
  notificationFirebaseReducer,
  notificationSmtpReducer,
  notificationTopicReducer,
  notificationTemplatesReducer,
  notificationEmailTemplatesReducer,
  notificationUsersReducer,
  tableRowsReducer,
  messagingTemplatesReducer,
  journeyReducer,
  journeyOptionsReducer,
  ruleCategoryReducer,
  usersReducer,
  rolesReducer,
  keycloakUsersReducer,
  keycloakTokenReducer,
  keycloakRolesReducer,
  keycloakRolesClinetReducer,
  keycloakUsersWithRolesReducer,
})

export default rootReducer
