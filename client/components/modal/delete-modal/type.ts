export type DeleteModalProps = {
  isOpen?: boolean
  cancel?(): void
  confirm?(): void
  detail?: string
  title?: string
}
