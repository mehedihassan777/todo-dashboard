import { fetchPostById } from "@/services/post-service";
import type { PostOutputInterface } from "@/types/post-output.interface";

type Params = { id: string };

export default async function PostPage(props: object) {
  let params: unknown = undefined;
  if (props && typeof props === "object" && "params" in props) {
    params = props.params;
  }
  if (!params) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        Invalid parameters.
      </div>
    );
  }
  // Await if params is a Promise
  const resolvedParams = params instanceof Promise ? await params : params;
  if (
    !resolvedParams ||
    typeof resolvedParams !== "object" ||
    resolvedParams === null ||
    typeof (resolvedParams as Params).id !== "string"
  ) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        Invalid post ID.
      </div>
    );
  }
  let post: PostOutputInterface | null = null;
  try {
    post = await fetchPostById(Number((resolvedParams as { id: string }).id));
  } catch (e) {
    if (
      typeof e === "object" &&
      e &&
      "response" in e &&
      typeof (e as { response: unknown }).response === "object" &&
      e.response !== null &&
      "status" in (e as { response: { status?: unknown } }).response &&
      (e as { response: { status?: unknown } }).response.status === 404
    ) {
      return (
        <div className="container mx-auto px-4 py-8 text-red-600">
          Post not found.
        </div>
      );
    }
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        Error loading post.
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:px-0 px-4 py-12">
      <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize text-[#0f2f54]">{post.title}</h1>
      <p className="mb-2 text-gray-700 first-letter:uppercase">{post.body}</p>
      <div className="text-sm text-gray-500">Post ID: {post.id} | User ID: {post.userId}</div>
      </div>
    </div>
  );
}
