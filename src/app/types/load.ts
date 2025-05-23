export interface LoadState<T> {
  data: T;
  pending: boolean;
  error: string | null;
}
