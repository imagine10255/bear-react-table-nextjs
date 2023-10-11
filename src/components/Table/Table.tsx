import React from 'react';
import BearReactTable, {elClassName, ITableProps, TBodyDataID, TBodyDataFieldKey} from 'bear-react-table';
import styled from 'styled-components';



type TValue = string|number
export interface IXProps<I extends TBodyDataID, K extends TBodyDataFieldKey> extends ITableProps<I, K> {

}

/**
 * Table
 */
const Table = <I extends TBodyDataID, K extends TBodyDataFieldKey>(props: IXProps<I, K>) => {
    return <TableRoot
        {...props}
    />;
};

export default Table;


const TableRoot = styled(BearReactTable)`
    --primary-color: #0a66c2;

    &.${elClassName.root} {
        //--header-line-height: 36px;
        //--body-line-height: 50px;

        thead th{
            font-weight: 100;
        }
    }
`;
