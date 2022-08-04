export type FindById<T> = {
  findById: (id: string) => Promise<T | undefined>;
};
