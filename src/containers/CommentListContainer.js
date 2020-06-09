import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getComments , getComment , removeComment , getAllComments , setCurrentPage } from '../store/modules/comments';
import CommentList from '../components/CommentList';


function CommentListContainer(){

    const { data , loading, error } = useSelector( state => state.comments.comments  )
    const dispatch = useDispatch();

    useEffect( () => {
      dispatch( getComments() )
    } , [dispatch] );
    
    const setFormByCommentId = (id) => {
      dispatch( getComment(id) );
    } 

    const removeByCommentId = async (id) => {
      await dispatch( removeComment(id) );
      await dispatch( getComments() );
      await dispatch( getAllComments() );
      dispatch( setCurrentPage(1) );
    } 

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생!</div>;
    if(!data) return null

    return (
      <div>
          <CommentList data={ data } 
            setFormByCommentId={ setFormByCommentId } 
            removeByCommentId={ removeByCommentId }/>
      </div>
    )


}

export default CommentListContainer;