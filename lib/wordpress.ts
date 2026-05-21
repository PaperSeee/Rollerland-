const WP_BASE = "https://retro.brussels/wp-json/wp/v2";

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, unknown>;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  title: { rendered: string };
  media_details?: {
    width: number;
    height: number;
  };
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const res = await fetch(`${WP_BASE}/pages?slug=${slug}&_fields=id,slug,title,content,acf`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const pages: WPPage[] = await res.json();
    return pages[0] ?? null;
  } catch {
    return null;
  }
}

export async function getMediaById(id: number): Promise<WPMedia | null> {
  try {
    const res = await fetch(`${WP_BASE}/media/${id}?_fields=id,source_url,alt_text,title,media_details`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getMediaBySearch(search: string, perPage = 10): Promise<WPMedia[]> {
  try {
    const res = await fetch(
      `${WP_BASE}/media?search=${encodeURIComponent(search)}&per_page=${perPage}&_fields=id,source_url,alt_text,title,media_details`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getAllMedia(perPage = 100): Promise<WPMedia[]> {
  try {
    const res = await fetch(
      `${WP_BASE}/media?per_page=${perPage}&_fields=id,source_url,alt_text,title,media_details`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
