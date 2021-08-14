export type ModalFormProps = {
  isOpen?: boolean
  cancel?(): void
  confirm?(): void
  title?: string
}
