import createAxiosInstance from '/src/utils/axiosApiService';

const axiosInstance = createAxiosInstance('/api/danhmuc');

export const getAllBooks = async () => {
    const response = (await axiosInstance.get('/'));
    return response;
}