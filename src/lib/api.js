const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}

export async function seedIfNeeded() {
  try {
    const products = await apiGet('/api/products?limit=1');
    if (!products || products.length === 0) {
      await apiPost('/api/seed', {});
    }
  } catch (e) {
    try { await apiPost('/api/seed', {}); } catch (_) {}
  }
}

export default { apiGet, apiPost, seedIfNeeded };
