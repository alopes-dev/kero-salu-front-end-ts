export const NotificationList = `query{NotificationsList {
  id
  description
  distination
	origin
  action
  status
  createdAt

}}`

export const NotificationsByDistination = (
  id: string
) => `query{NotificationsByDistinationOrAll(id:"${id}") {
  id
  description
  distination
	origin
  action
  status
  createdAt
  company{designation}
}}`

export const NotificationsByOrigin = (
  id: string
) => `query{NotificationsByOriginOrDistinationId(id:"${id}") {
  id
  description
  distination
	origin
  action
  status
  createdAt
  company{designation}
}}`

export const getOneNotification = (
  id: string
) => `query{Notification(id:"${id}") {
  id
  description
  distination
	origin
  action
  status
  createdAt
}}`

export const StoreNotification = `mutation ($input: NotificationInput) {
  CreateNotification(input: $input) {
    id
  }
}
`

export const UpdateNotification = `mutation ($input: NotificationInput) {
  UpdateNotification(input: $input) {
    id
  }
}
`

export const NotificationListByCandidature = (id: string) => `
query{NotificationsListByCandidature(id:"${id}") {
  id
  description
  distination
	origin
  action
  status
  createdAt
}}
`
