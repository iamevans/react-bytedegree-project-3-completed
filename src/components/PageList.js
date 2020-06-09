import React from 'react';
import styled from "styled-components";

const PageListStyle = styled.div`
  margin-bottom : 20px;
  text-align : center;
`;

const Page = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  ${({ active }) => active && `
        background: gray;
        color: #fff;
  `}
  margin-right: 3px;
  
`;

function PageList({ total_count , current_page , onSetCurrentPage }){

    const page_count = Math.ceil( total_count / 4 );

    const pageArray = [];
    for (let num = 1; num <= page_count ; num++) {
        pageArray.push(
            <Page 
                key={num}
                onClick={ () => onSetCurrentPage( `${num}` ) }  
                active={ (  parseInt(current_page)===num ) ? true : false} >
                    {num}
            </Page>
        );
    }

    return <PageListStyle>{pageArray}</PageListStyle>
}

export default PageList;