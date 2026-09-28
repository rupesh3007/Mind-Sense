const rawBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

const ITEMS_URL = `${API_BASE_URL}/api/items`;

/**
 * Turns low-level fetch failures into a message you can read in the UI.
 * Browsers often report these as "Failed to fetch" when the API is down or blocked.
 */
function mapNetworkError(err) {
  const msg = err?.message || String(err);
  if (
    err?.name === "TypeError" &&
    /failed to fetch|load failed|networkerror|network request failed/i.test(msg)
  ) {
    return new Error(
      [
        `Could not reach the API at ${API_BASE_URL}.`,
        "",
        "Common fixes:",
        "• Open this app at http://localhost:3000 (run: npm start in the mindsense folder). Do not open index.html as a file.",
        "• Start MongoDB, then in the backend folder run: npm start",
        "• In the browser, open http://localhost:5000/health — you should see {\"ok\":true}",
      ].join("\n")
    );
  }
  return err instanceof Error ? err : new Error(msg);
}

/** Read body as JSON; if the server sent HTML or plain text, surface a short snippet. */
async function readJson(res) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {
      message:
        text.slice(0, 160).replace(/\s+/g, " ") +
        (text.length > 160 ? "…" : "") ||
        `Unexpected response (${res.status})`,
    };
  }
}

/**
 * Shared fetch wrapper: parses JSON, throws on !ok, maps network errors.
 * @param {string} suffix - "" for collection, "/<id>" for one item
 * @param {RequestInit} [init]
 */
async function requestItems(suffix, init) {
  const url = suffix ? `${ITEMS_URL}${suffix}` : ITEMS_URL;
  try {
    const res = await fetch(url, init);
    const json = await readJson(res);
    if (!res.ok) {
      throw new Error(json.message || `Request failed (${res.status})`);
    }
    return json;
  } catch (e) {
    throw mapNetworkError(e);
  }
}

/**
 * POST /api/items — add a new record.
 *
 *   fetch(ITEMS_URL, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ title, amount, category }),
 *   })
 */
export async function createItem({ title, amount, category }) {
  const json = await requestItems("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, amount, category }),
  });
  return json.data;
}

/**
 * GET /api/items — load all records.
 *
 *   fetch(ITEMS_URL)
 */
export async function fetchItems() {
  const json = await requestItems("", {});
  return Array.isArray(json.data) ? json.data : [];
}

/**
 * DELETE /api/items/:id
 *
 *   fetch(`${ITEMS_URL}/${id}`, { method: "DELETE" })
 */
export async function deleteItem(id) {
  const json = await requestItems(`/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  return json.data;
}
