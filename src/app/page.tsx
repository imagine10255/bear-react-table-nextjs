'use client';

import Image from 'next/image';
import styles from './page.module.css';
import styled from 'styled-components';
import {Row, Grid, Col, Container} from 'bear-react-grid';
import {useState} from 'react';
import {IPaginateMeta, TOnChangePage} from 'bear-react-table';
import {data, IPaginateData} from '@/config/data';
import Table, {getPageData} from '@/components/Table';

export default function Home() {

    const [isFetching, setIsFetching] = useState(false);
    const [paginateMeta, setPaginateMeta] = useState<IPaginateMeta>({
        currentPage: 1,
        pageLimit: 8,
        order: {
            orderField: 'id',
            orderBy: 'DESC',
        }
    });
    const [paginateData, setPaginateData] = useState<IPaginateData[]>(getPageData(paginateMeta.currentPage, paginateMeta.pageLimit));

    const paginateInfo = {
        totalItems: data.length,
        totalPages: Math.ceil(data.length / paginateMeta.pageLimit),
    };


    /**
     * 查詢分頁
     */
    const handleFetchPaginate: TOnChangePage = (meta) => {
        // 取得查詢項目
        setIsFetching(true);
        // console.log('meta', meta);
        setPaginateMeta(meta);

        const {currentPage, pageLimit, order} = meta;

        setTimeout(() => {
            setPaginateData(getPageData(currentPage, pageLimit, order));
            setIsFetching(false);
        }, 400);
    };

    const renderMain = () => {
        return <Grid columns="1fr auto 1fr" className="align-items-center mb-5">

            <div className="d-flex justify-content-end">
                <Image
                    src="/logo.svg"
                    alt="BearReactGrid Logo"
                    width={50}
                    height={50}
                    className="mr-3"
                    priority
                />
                <Title>
                    Bear React Table
                </Title>
            </div>

            <Add/>
            <Image
                className={styles.logo}
                src="/next.svg"
                alt="Next.js Logo"
                width={180}
                height={30}
                priority
            />

        </Grid>;
    };


    const renderLearn = () => {
        const data = [
            {
                text: 'Docs',
                desc: 'Find in-depth information about Next.js features and API.',
                url: 'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app',
            },
            {
                text: 'Learn',
                desc: 'Learn about Next.js in an interactive course with&nbsp;quizzes!',
                url: 'https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app',
            },
            {
                text: 'Templates',
                desc: 'Explore the Next.js 13 playground.',
                url: 'https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app',
            },
            {
                text: 'Deploy',
                desc: 'Instantly deploy your Next.js site to a shareable URL with Vercel.',
                url: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app',
            },
        ]

        return <Table
            isDark
            gap="8px"
            isFetching={isFetching}
            isStickyHeader
            isEnableChangePageScrollTop={false}
            title={{
                plus:     {text: '',       col: 50,      titleAlign: 'center', dataAlign: 'center'},
                avatar:   {text: '#',      col: 50,      titleAlign: 'center', dataAlign: 'center'},
                name:     {text: 'Name',   col: 'auto',  isEnableSort: true},
                role:     {text: 'Role',   col: '120px'},
                joined:  {text: 'Joined',  col: '80px'},
            }}
            footer={{
                name: {value: 'Total'},
            }}
            data={paginateData.map(row => {
                return {
                    id: row.id,
                    detail: <>
                        <div>{row.name}</div>
                        <div>{row.amount}</div>
                        <div>{row.role}</div>
                    </>,
                    onClickRow: () => console.log(`click row id: ${row.id}`),
                    field: {
                        plus: (args) => <CollapseButton
                            type="button" onClick={args.collapse}
                            data-active={args.isActive ? '':undefined}
                        >
                            {args.isActive ? '-': '+'}
                        </CollapseButton>,
                        avatar: <Avatar src={row.avatar}/>,
                        name: row.name,
                        role: row.role,
                        joined: row.isJoined ? 'Y':'N',
                    },
                };
            })}
            onChangePage={handleFetchPaginate}
            paginateMeta={paginateMeta}
            paginateInfo={paginateInfo}
        />;
    }


    return (
        <Container className="d-flex flex-column align-items-center justify-content-center"
        style={{height: '100vh'}}>
            {renderMain()}
            {renderLearn()}
        </Container>
    );
}


const Title = styled.div`
  font-size: 40px;
  color: #fff;
`;

const Add = styled.div`
  font-size: 40px;
  color: #fff;

  :after {
    content: '+';
  }
`;


const Avatar = styled.img`
  border-radius: 99em;
  overflow: hidden;
  width: 20px;
  height: 20px;
`;




const CollapseButton = styled.button`
    width: 20px;
    height: 20px;
    background-color: #535bf2;
    border-radius: 4px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    outline: none;
    box-shadow: none;
    border: none;
    color: #fff;

    &[data-active] {
        background-color: #f25353;
    }
`;
