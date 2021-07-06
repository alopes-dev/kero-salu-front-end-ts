export interface ResponseInner {
  [x: string]: any
  designation: string
  id: string
}
export interface ResponseLess {
  data: ReadonlyArray<ResponseInner>
  total: number
}

export interface HttpResponse<T> {
  data: T | any
  error: boolean
  message: string
}
