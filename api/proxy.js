export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }
  
    try {
      const targetUrl = `https://dload-oktatas.educatio.hu${url}`;
      const response = await fetch(targetUrl);
  
      if (!response.ok) {
        return res.status(response.status).json({ error: `Failed to fetch: ${response.statusText}` });
      }
  
      const data = await response.buffer(); // Ha fájlt töltesz le
      res.setHeader("Content-Type", response.headers.get("content-type"));
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ error: "Proxy error", details: error.message });
    }
  }