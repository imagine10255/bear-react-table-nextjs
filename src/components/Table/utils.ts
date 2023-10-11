import {data, IPaginateData} from '@/config/data';

export const getPageData = (currentPage: number, pageLimit: number, order?: {orderField: string, orderBy: 'DESC'|'ASC'}) => {

    if(order){
        data.sort((a, b) => mockSort(order.orderBy, order.orderField, a,b));
    }

    const pageStart = (currentPage -1) * pageLimit;
    return data.slice(pageStart, pageStart + pageLimit );
};


export const mockSort = (by: 'DESC'|'ASC', field: string, a: IPaginateData, b: IPaginateData) => {

    const fieldName = field as keyof IPaginateData;

    if (a[fieldName] < b[fieldName]) {
        return by === 'ASC' ? -1 : 1;
    }else if (a[fieldName] > b[fieldName]) {
        return by === 'ASC' ?  1: -1;
    }
    // a 必須等於 b
    return 0;
};
