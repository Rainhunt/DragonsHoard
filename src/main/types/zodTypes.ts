import { ZodArray, ZodObject, ZodType, ZodTypeAny, ZodUnion, ZodUnionOptions } from "zod";

export type ZodObjectPaths<T> = T extends ZodObject<infer Shape> ? (
    { [K in string & keyof Shape]:
        Shape[K] extends (ZodArray<ZodTypeAny> | ZodUnion<ZodUnionOptions>) ? never : (
            `.${K}${("" | ZodObjectPaths<Shape[K]>)}`
        )
    }[string & keyof Shape]
) : never;

export type ZodElementTerminatingPaths<E extends ZodType, T> = T extends ZodObject<infer Shape> ? (
    {
        [K in string & keyof Shape]:
        Shape[K] extends E ? `.${K}` : (
            ZodElementTerminatingPaths<E, Shape[K]> extends never ? never : `.${K}${ZodElementTerminatingPaths<E, Shape[K]>}`
        )
    }[string & keyof Shape]
) : never;

export type ZodArrayTerminatingPaths<T> = ZodElementTerminatingPaths<ZodArray<ZodTypeAny>, T>;
export type ZodUnionTerminatingPaths<T> = ZodElementTerminatingPaths<ZodUnion<ZodUnionOptions>, T>;