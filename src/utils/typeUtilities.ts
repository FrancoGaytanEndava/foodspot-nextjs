type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

export type NestedKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends Record<string, any>
    ? K | Join<K, NestedKeyOf<T[K]>>
    : K;
}[keyof T & (string | number)];
