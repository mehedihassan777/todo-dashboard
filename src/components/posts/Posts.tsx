"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { fetchPosts } from "@/services/post-service";
import { useFetch } from "@/hooks/useFetch";
import type { PostOutputInterface } from "@/types/post-output.interface";
import InfoCard from "@/components/common/InfoCard";

const Posts: React.FC = () => {
  const stableFetcher = useCallback(() => fetchPosts(), []);
  const { data: posts, loading, error } = useFetch(stableFetcher);

  return (
    <div className="container mx-auto lg:px-0 px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-[#0f2f54]">Posts</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts && posts.map((post) => (
          <InfoCard
            key={post.id}
            title={post.title}
            body={post.body}
            link={`/posts/${post.id}`}
            linkText="Read more"
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
