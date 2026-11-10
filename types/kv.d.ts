// Type minimal de Workers KV (lien MEDIA), sans dépendre de @cloudflare/workers-types.
interface KVNamespace {
  put(key: string, value: ArrayBuffer, options?: { metadata?: unknown }): Promise<void>;
  getWithMetadata<M>(key: string, type: "arrayBuffer"): Promise<{ value: ArrayBuffer | null; metadata: M | null }>;
}
