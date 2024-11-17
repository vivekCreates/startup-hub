"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string; // Optional if image might be null
  pitch: string;
  user:{
    avatar:string;
    name:string;
  }
  views?: number;
  created_at?: Date;
  user_id?: number;
}


interface PostContextType {
  posts: Post[];
  suggestedPosts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  increaseView: (id: number) => void;
  
}


const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [suggestedPosts, setSuggestedPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts();
    getSuggestedPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/post/all");

      if (!response.ok) {
        console.error("Failed to fetch posts.");
        return;
      }

      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      } else {
        console.error("Failed to fetch posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const increaseView = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/post/views/${id}`,
        {
          method: "POST", // Assuming you're sending a POST request to increment views
        }
      );
      if (!response.ok) {
        throw new Error("View count not increased");
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error("View count not increased");
      }

      // Find the post in the current posts array and increment its view count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, views: (post.views || 0) + 1 } : post
        )
      );
    } catch (error: any) {
      console.error("Error incrementing views:", error.message);
    }
  };

  const getSuggestedPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/post/suggest");
      if (!response.ok) {
        throw new Error("cant fetched suggested posts");
      }
      const data = await response.json();
      setSuggestedPosts(data.posts);
      console.log('suggestedPosts',suggestedPosts)
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, increaseView,suggestedPosts }}>
      {children}
    </PostContext.Provider>
  );
};


export const usePostContext = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePostContext must be used within a PostContextProvider");
  }
  return context;
};
