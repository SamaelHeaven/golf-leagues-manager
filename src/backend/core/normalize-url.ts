export function normalizeURL(url: string): string {
    const result = url.replace(/^\/+|\/+$/g, "").replace(/\/+/g, "/");
    return `/${result}`;
}
