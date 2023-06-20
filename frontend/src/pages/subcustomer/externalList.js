import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListContainer from '../components/list/ListContainer';
import Paging from '../main/page/paging';
import './external.css';

const ExternalList = () => {
    const [externalList, setExternalList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [externalPerPage] = useState(5);
    const [expanded, setExpanded] = useState([]);

    const handleClick = (index) => {
        setExpanded((prevState) => {
        const updatedExpanded = [...prevState];
        updatedExpanded[index] = !updatedExpanded[index];
        return updatedExpanded;
        });
    };

    useEffect(() => {
        fetchMyExternalList();
    }, []);

    const fetchMyExternalList = async () => {
        try {
        const accessToken = localStorage.getItem('accessToken');
        const page = currentPage;
        const response = await axios.get(`http://localhost:8080/worker/page?page=${page}`, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
        const myExternalListData = response.data.content;
        setExternalList(myExternalListData);
        setExpanded(new Array(myExternalListData.length).fill(false));
        } catch (error) {
        console.error('Error fetching my external list:', error);
        }
    };

    const indexOfLastExternal = currentPage * externalPerPage;
    const indexOfFirstExternal = indexOfLastExternal - externalPerPage;
    const currentExternalList = externalList.slice(indexOfFirstExternal, indexOfLastExternal);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='mobile-container'>
            <div className='title'>
                <span className='title-text'>oo님의 공사 신고 접수 내역</span>
            </div>
            <hr />
            <Link to={"/externalreceipt"}><button className='receipt-button'>공사 신고 접수</button></Link>
            <hr />
            <div className='list-content'>
                <div className='sub-title'>
                <span className='sub-title'>접수 목록</span>
                </div>
                <hr />
                <ListContainer currentExternalList={currentExternalList} expanded={expanded} handleClick={handleClick} />
            </div>

            <Paging
                articlesPerPage={externalPerPage}
                totalArticles={externalList.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default ExternalList;
