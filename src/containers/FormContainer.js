import React from 'react';
import Form from '../components/Form';
import { useDispatch , useSelector } from 'react-redux';
import { addComment, 
        getAllComments , 
        getComments , 
        changeForm ,
        setCurrentPage , 
        updateComment} from '../store/modules/comments';

function FormContainer(){

    const { form , current_page  } = useSelector( state => state.comments );
    
    const dispatch = useDispatch();
    
    const onChange = e => {
        dispatch(changeForm(e.target));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if(form.method==='post'){
            await dispatch( addComment(form.data) );
            await dispatch( getComments() );
            await dispatch( getAllComments() );
            await dispatch( setCurrentPage(1) );
        }else if(form.method==='put'){
            await dispatch( updateComment(form.data) );
            await dispatch( getComments(current_page) );
        }

        
    }


    return (
        <Form onChange={onChange} 
            onSubmit={onSubmit}
            form={form} />
    )


}

export default FormContainer;