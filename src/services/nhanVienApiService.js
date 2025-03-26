import createAxiosInstance from '/src/utils/axiosApiService';

const axiosInstance = createAxiosInstance('/api/nhanvien');

export const getAllNV = async () => {
    const response = (await axiosInstance.get('/'));
    return response;
}