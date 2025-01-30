export const fetchFile = async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.error("Error fetching file:", error);
      return false;
    }
};