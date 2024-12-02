import axiosInstance from "./AxiosConfig";

const getHomeComicList = async () => {
  try {
    const response = await axiosInstance.get("home");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getComicDetail = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`truyen-tranh/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getHomeComicList, getComicDetail };
