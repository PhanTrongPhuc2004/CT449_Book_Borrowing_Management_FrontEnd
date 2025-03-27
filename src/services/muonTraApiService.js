import createAxiosInstance from '/src/utils/axiosApiService';

const axiosInstance = createAxiosInstance('/api/muontra');

export const getAllBorrowings = async () => {
    const response = (await axiosInstance.get('/'));
    return response;
};

export const getUseBorrowings = async (MaDG) => {
    const response = (await axiosInstance.get(`/dangmuon?MaDG=${MaDG}`));
    return response;
};

export const createBorrowings = async (data) => {
    const response = await axiosInstance.post('/muon', data);
    return response;
};

export const returnBorrowings = async (data) => {
    const response = await axiosInstance.post('/tra', data);
    return response;
}

export const deleteBorrowings = async (data) => {
    const response = await axiosInstance.post('/xoayeucau', data);
    return response;
}