import axios from "axios";

export const fetchFile = async (url: string) => {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    console.error("Error fetching file:", error);
    return false;
  }
};
