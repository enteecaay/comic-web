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

const getGenres = async () => {
  try {
    const response = await axiosInstance.get(`the-loai`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getComicByGenre = async (slug: string, page: number) => {
  try {
    const response = await axiosInstance.get(`the-loai/${slug}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getHomeComicList, getComicDetail, getGenres, getComicByGenre };
