import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getAllComments , getComments , setCurrentPage } from '../store/modules/comments';
import PageList from '../components/PageList';

function PageListContainer(){

    const { data , loading, error } = useSelector( state => state.comments.all_comments  );
    const current_page = useSelector( state => state.comments.current_page  );

    const dispatch = useDispatch();

    useEffect( () => {
      dispatch( getAllComments() );
    } , [dispatch] );

    const onSetCurrentPage = ( page ) =>{
        dispatch( getComments( page ) );
        dispatch( setCurrentPage( page ) );
    }

    
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생!</div>;
    if(!data) return null

    return (
      <PageList 
        total_count={ data.length } 
        current_page={current_page}
        onSetCurrentPage={ onSetCurrentPage }
      />
    )


}

export default PageListContainer;