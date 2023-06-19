import React from "react";
import { Link } from 'react-router-dom';
import ListContainer from '../components/list/ListContainer';
import './external.css'

const ExternalList = () => {
    const numbers = [1, 2, 3, 4, 5];
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
            <ListContainer numbers={numbers} />
        </div>
    </div>
    )
};

export default ExternalList;