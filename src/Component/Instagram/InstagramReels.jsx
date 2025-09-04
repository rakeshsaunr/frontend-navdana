// InstagramReels.jsx
import React, { useEffect, useState } from "react";

const InstagramReels = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚡ Apna Instagram User ID aur Long-Lived Token yaha daalo
  const INSTAGRAM_USER_ID = "1310217830479638";
  const ACCESS_TOKEN =
    "895b0152216b00b107657f00ac7e00ee";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,children{media_type,media_url}&access_token=${ACCESS_TOKEN}`
        );
        const data = await response.json();
        console.log("API response:", data); // 👀 Debugging

        if (data.data) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading Instagram feed...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Instagram Feed</h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl overflow-hidden shadow-lg bg-white"
            >
              {post.media_type === "VIDEO" ? (
                <video
                  src={post.media_url}
                  controls
                  className="w-full h-80 object-cover"
                />
              ) : post.media_type === "IMAGE" ? (
                <img
                  src={post.media_url}
                  alt={post.caption || "Instagram Post"}
                  className="w-full h-80 object-cover"
                />
              ) : post.media_type === "CAROUSEL_ALBUM" ? (
                <img
                  src={post.children?.data[0]?.media_url}
                  alt="Carousel Post"
                  className="w-full h-80 object-cover"
                />
              ) : null}

              <div className="p-3">
                <p className="text-sm text-gray-700">
                  {post.caption ? post.caption.substring(0, 80) + "..." : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstagramReels;
