export interface GeneralResponse<T = any> {
  isSuccess: boolean;
  status: string;
  messages: string[];
  data: T;
}
