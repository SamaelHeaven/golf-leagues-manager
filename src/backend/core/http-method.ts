export const HTTP_METHODS = {
    get: "get",
    put: "put",
    post: "post",
    delete: "delete",
    patch: "patch"
} as const;

export type HTTPMethod = keyof typeof HTTP_METHODS;
