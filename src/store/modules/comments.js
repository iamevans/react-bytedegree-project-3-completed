import * as commentsApi from '../../api/comments';
import { reducerUtils , formInit , createPromiseThunk , handleAsyncActions } from '../../lib/asyncUtils';
import produce from 'immer';

const GET_COMMENTS = 'comments/GET_COMMENTS';
const GET_COMMENTS_SUCCESS = 'comments/GET_COMMENTS_SUCCESS';
const GET_COMMENTS_ERROR = 'comments/GET_COMMENTS_ERROR';

const GET_COMMENT = 'comments/GET_COMMENT';
const GET_COMMENT_SUCCESS = 'comments/GET_COMMENT_SUCCESS';
const GET_COMMENT_ERROR = 'comments/GET_COMMENT_ERROR';


const ADD_COMMENT = 'comments/ADD_COMMENT';
const ADD_COMMENT_SUCCESS = 'comments/ADD_COMMENT_SUCCESS';
const ADD_COMMENT_ERROR = 'comments/ADD_COMMENT_ERROR';

const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const UPDATE_COMMENT_SUCCESS = 'comments/UPDATE_COMMENT_SUCCESS';
const UPDATE_COMMENT_ERROR = 'comments/UPDATE_COMMENT_ERROR';

const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';
const REMOVE_COMMENT_SUCCESS = 'comments/REMOVE_COMMENT_SUCCESS';
const REMOVE_COMMENT_ERROR = 'comments/REMOVE_COMMENT_ERROR';


const GET_ALL_COMMENTS = 'comments/GET_ALL_COMMENTS';
const GET_ALL_COMMENTS_SUCCESS = 'comments/GET_ALL_COMMENTS_SUCCESS';
const GET_ALL_COMMENTS_ERROR = 'comments/GET_ALL_COMMENTS_ERROR';

const SET_CURRENT_PAGE = 'comments/SET_CURRENT_PAGE';

const CHANGE_FORM = 'comments/CHANGE_FORM';

export const getComments =  ( _page ) => createPromiseThunk( GET_COMMENTS , commentsApi.getComments  )( _page  ); 

export const getComment =  ( id  ) => createPromiseThunk( GET_COMMENT , commentsApi.getComment  )( id ); 

export const getAllComments =  createPromiseThunk( GET_ALL_COMMENTS , commentsApi.getAllComments  ); 

export const addComment = ( data ) => createPromiseThunk( ADD_COMMENT , commentsApi.addComment  )( data )

export const updateComment =  (data) => createPromiseThunk( UPDATE_COMMENT , commentsApi.updateComment  )( data )

export const removeComment =  (id) =>createPromiseThunk( REMOVE_COMMENT , commentsApi.removeComment  )( id )

export const setCurrentPage =  ( current_page ) => dispatch => {

    dispatch({ 
        type : SET_CURRENT_PAGE ,
        payload : {
            current_page
        }
    });

}

export const changeForm =  (target) => dispatch => {

    dispatch({ 
        type : CHANGE_FORM ,
        payload : {
            name : target.name,
            value : target.value,
        }
    });

}


export const initialState = {
    comments : reducerUtils.initial(),
    comment : reducerUtils.initial(),
    all_comments : reducerUtils.initial(),
    current_page : 1 ,
    form : formInit()
};

const getCommentsReducer = handleAsyncActions( GET_COMMENTS , 'comments' );
const getAllCommentsReducer = handleAsyncActions( GET_ALL_COMMENTS , 'all_comments' );
const removeCommentReducer = handleAsyncActions( REMOVE_COMMENT , 'comment' );

export default function comments ( state = initialState , action ){
    switch (action.type){
        case GET_COMMENTS : 
        case GET_COMMENTS_SUCCESS : 
        case GET_COMMENTS_ERROR : 
            return getCommentsReducer( state, action );

        case GET_COMMENT : 
            return produce(state, draft => {
                draft.comment = reducerUtils.loading()
                draft.form = formInit()
            })
        case GET_COMMENT_SUCCESS : 
            return produce(state, draft => {
                draft.comment = reducerUtils.success(action.payload.data)
                draft.form = formInit({
                    method : "put" ,
                    data : action.payload.data 
                })
            })

        case GET_COMMENT_ERROR : 
            return produce(state, draft => {
                draft.comment = reducerUtils.error(action.payload)
            })

        case GET_ALL_COMMENTS : 
        case GET_ALL_COMMENTS_SUCCESS : 
        case GET_ALL_COMMENTS_ERROR : 
            return getAllCommentsReducer( state, action );

        case ADD_COMMENT : 
            return produce(state, draft => {
                draft.comment = reducerUtils.loading()
            })
        case ADD_COMMENT_SUCCESS : 
            return produce(state, draft => {
                draft.comment = reducerUtils.success(action.payload.data)
                draft.form = formInit()
            })

        case ADD_COMMENT_ERROR : 
            return produce(state, draft => {
                draft.comment = reducerUtils.error(action.payload)
            })

        case UPDATE_COMMENT : 
            return produce(state, draft => {
                draft.comment = reducerUtils.loading()
            })
        case UPDATE_COMMENT_SUCCESS : 
            return produce(state, draft => {
                draft.comment = reducerUtils.success(action.payload.data)
                draft.form = formInit()
            })

        case UPDATE_COMMENT_ERROR : 
            return produce(state, draft => {
                draft.comment = reducerUtils.error(action.payload)
            })

        case REMOVE_COMMENT : 
        case REMOVE_COMMENT_SUCCESS : 
        case REMOVE_COMMENT_ERROR : 
            return removeCommentReducer( state , action );

        case SET_CURRENT_PAGE : 
            return produce(state, draft => {
                draft.current_page = action.payload.current_page
            })


        case CHANGE_FORM : 

            return produce(state, draft => {
                draft.form.data[action.payload.name] = action.payload.value
            })

        default : 
            return state
    }

}