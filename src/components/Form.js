import React from 'react';
import styled from "styled-components";

const FormStyle = styled.div`
    & > form {
        padding : 0 10px;
        margin-bottom : 50px;
    }

    & > form > textarea {
        padding : 5px 1%;
        width : 98%;
        height : 50px;
    }

    & > form > input[type=text] {
        padding : 5px 1%;
        width : 98%;
        margin-bottom : 10px;
    }

    & > form > button {
        padding: 0.375rem 0.75rem;
        border-radius: 0.25rem;
        border: 1px solid lightgray;
        cursor : pointer; 
    }
`;






function Form({ onSubmit , onChange, form }){

    return <FormStyle>
        <form onSubmit={onSubmit}>
            <input type="text" 
                name="profile_url" 
                onChange={ onChange } 
                placeholder="https://picsum.photos/id/1/50/50" 
                required 
                value={ form.data.profile_url }/>
            <br/>
            <input 
                type="text" 
                name="author" 
                onChange={ onChange }  
                placeholder="작성자" 
                required 
                value={ form.data.author }/>
            <br/>
            <textarea
                name="content" 
                onChange={ onChange } 
                placeholder="내용" 
                required value={ form.data.content }></textarea>
            <br/>
            <input 
                type="text"
                name="createdAt" 
                onChange={ onChange } 
                placeholder="2020-05-30" 
                value={ form.data.createdAt }required />
            <br/>
            <button type="submit" >등록</button>
        </form>
    </FormStyle>
}

export default Form;