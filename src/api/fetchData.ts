import axios from 'axios';
export interface IResponse<T> {
    error: null | string;
    data: null | T;
    message: string;
  }

export const getFetch = async (url: string) => {
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return {
        error: null,
        data: res.data,
        message: 'Данные успешно получены',
      };
    }
    throw Error('Error');
  } catch (error: any) {
    return { error: error.message, data: null, message: 'Данные не найдены' };
  }
};
