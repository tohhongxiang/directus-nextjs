function serializeUtil<T extends { [key: string]: any }>(obj: T, prefix?: string) {
    let str = []

    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            const k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serializeUtil(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

export default function serialize<T extends { [key: string]: any }>(obj: T) {
    return serializeUtil(obj)
}