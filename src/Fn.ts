export type Fn<A, B> = (a: A) => B;
export type Endo<A> = Fn<A, A>;
export type KeySelector<A> = Fn<A, string>;
export type GroupBy<A> = Fn<KeySelector<A>, Fn<A[], Record<string, A[]>>>;
export type Predicate<A> = Fn<A, boolean>;
