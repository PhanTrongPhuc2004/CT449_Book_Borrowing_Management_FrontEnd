import createAxiosInstance from '/src/utils/axiosApiService';

const axiosInstance = createAxiosInstance('/api/docgia');

export const getAllDG = async () => {
    const response = (await axiosInstance.get('/'));
    return response;
}