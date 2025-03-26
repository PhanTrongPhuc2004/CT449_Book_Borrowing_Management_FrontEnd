import createAxiosInstance from '/src/utils/axiosApiService';

const axiosInstance = createAxiosInstance('/api/sach');

export const createBook = async (data) => {
    const response = (await axiosInstance.post('/', data)).data;
    return response;
}

export const getAllBooks = async () => {
    const response = (await axiosInstance.get('/')).data;
    return response;
};

export const getSingleBook = async (bookId) => {
    const response = (await axiosInstance.get(`/${bookId}`)).data;
    return response;
};

export const updateBook = async (bookId, data) => {
    const response = (await axiosInstance.patch(`/${bookId}`, data)).data;
    return response;
};
