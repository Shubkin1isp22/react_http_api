// SearchPost.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/slices/searchSlice";
import { usePosts } from "../hooks/usePosts";

function SearchPost() {
  const dispatch = useDispatch();
  const query = useSelector((s) => s.search.query);

  const { postsQuery } = usePosts();
  const posts = postsQuery.data ?? [];

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.body.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />

      {filtered.map((p) => (
        <div key={p.id} className="post-card">
          <h3>{p.title}</h3>
          <p>{p.body}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchPost;