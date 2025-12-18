import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { openModal, closeModal } from '../../redux/slices/uiSlice';
import { setEditingPost, clearEditingPost } from '../../redux/slices/editorSlice';
import { fetchPosts, addNewPost, editPost, removePost } from '../../redux/thunks/postsThunks';
import { selectAllPosts, selectPostsLoading, selectPostsCount, selectPostsError } from '../../redux/selectors/postsSelectors';
import { clearPostsError } from '../../redux/slices/postsSlice';
export const usePost = ()=> {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const loading = useSelector(selectPostsLoading);
    const postsCount = useSelector(selectPostsCount);
    const error = useSelector(selectPostsError);

    const editingPost = useSelector(state => state.editor.editingPost);
    const modalOpen = useSelector(state => state.ui.ModalOpen);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleAdd = (post) => dispatch(addNewPost(post));

    const handleEdit = (post) => {
        dispatch(setEditingPost(post));
        dispatch(openModal());
    };

    const handleSave = (updatedPost) => {
        dispatch(editPost(updatedPost));
        dispatch(clearEditingPost());
        dispatch(closeModal());
    };

    const handleCancel = () => {
        dispatch(clearEditingPost());
        dispatch(closeModal());
    };

    const handleDelete = (id) => dispatch(removePost(id));

    const handleClearError = () => dispatch(clearPostsError());
    return {posts, loading, postsCount,error, modalOpen, editingPost, handleAdd, handleEdit, handleDelete, handleSave,handleCancel,  handleClearError}
}