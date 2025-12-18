// src/Posts.js
import AddPost from '../../components/AddPost';
import EditPost from '../../components/EditPost';
import PostsList from '../../components/PostsList';
import { usePost } from './usePost';


function Posts() {
  const {posts, loading, postsCount,error, modalOpen, editingPost, handleAdd, handleEdit, handleDelete, handleSave,handleCancel,  handleClearError} = usePost()


  
  return (
    <div className="container">
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleClearError}>Закрыть</button>
        </div>
      )}

      <section className="add-post-section">
        <AddPost onAdd={handleAdd} />
      </section>

      {modalOpen && editingPost && (
        <EditPost post={editingPost} onSave={handleSave} onCancel={handleCancel} />
      )}

      <section className="posts-section">
        <h2>
          Все статьи ({postsCount}) {/* Показываем количество постов */}
        </h2>
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <PostsList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </section>
    </div>
  );
}

export default Posts;