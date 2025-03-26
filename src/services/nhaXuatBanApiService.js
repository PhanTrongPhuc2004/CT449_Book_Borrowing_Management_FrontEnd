import createAxiosInstance from '/src/utils/axiosApiService';

const axiosInstance = createAxiosInstance('/api/nhaxuatban');

export const getAllNXB = async () => {
    const response = (await axiosInstance.get('/'));
    return response;
}