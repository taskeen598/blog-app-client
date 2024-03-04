import { create } from "zustand";
// import {persist,devtools} from "zustand/middleware"

// const domain = "http://localhost:3006";
const domain = "https://blog-app-server-ecru.vercel.app";

interface BlogState {
  blogs: [];
  singleBlog: {
    _id: string;
    user: {
      _id: string;
      profileImage: string;
      name: string;
    };
    reaction: [];
    comments: [];
    categories: {
      name: string;
    };
    title: string;
    description: string;
    image: string;
    status: string;
    tags: [];
    createdAt: string;
    updatedAt: string;
  };
  getAllBlogs: () => void;
  getSingleBlog: (id: string) => void;
  createComment: (id: string, commentData: { content: string }) => void;
  updateComment: (
    id: string,
    blogId: string,
    commentData: { content: string }
  ) => void;
  deleteComment: (id: string, blogId: string) => void;
  comments: [];
  createBlog: (
    blogData: {
      title: string;
      description: string;
      categories: string;
    },
    imageData: any
  ) => void;
}

const BlogStore = (set: any): BlogState => ({
  blogs: [],
  singleBlog: {
    _id: "",
    user: {
      _id: "",
      profileImage: "",
      name: "",
    },
    reaction: [],
    comments: [],
    categories: {
      name: "",
    },
    title: "",
    description: "",
    image: "",
    status: "",
    tags: [],
    createdAt: "",
    updatedAt: "",
  },
  comments: [],

  getAllBlogs: async () => {
    try {
      const res = await fetch(`${domain}/blog`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const blogsData = await res.json();
      console.log(blogsData);

      const blogsWithReactionCounts = blogsData.map((blog: any) => {
        const reactionCounts = blog?.reaction?.reduce(
          (counts: any, reaction: any) => {
            counts[reaction?.reactionType] =
              (counts[reaction?.reactionType] || 0) + 1;
            return counts;
          },
          {}
        );
        return { ...blog, reactionCounts };
      });

      console.log(blogsWithReactionCounts);

      set({
        blogs: blogsWithReactionCounts,
      });
      // Update the state with the received token

      return { blogsWithReactionCounts };
    } catch (error: any) {
      console.log(error);
    }
  },

  getSingleBlog: async (id: string) => {
    let localAuth: any = localStorage.getItem("Auth");
    localAuth = JSON.parse(localAuth);
    try {
      // Make a POST request to the login endpoint
      const res = await fetch(`${domain}/blog/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Parse the response as JSON
      const blogsData: any = await res.json();
      console.log(blogsData);
      const reactionCounts = blogsData?.reaction?.reduce(
        (counts: any, reaction: any) => {
          counts[reaction?.reactionType] =
            (counts[reaction?.reactionType] || 0) + 1;
          return counts;
        },
        {}
      );
      console.log(reactionCounts);
      if (localAuth) {
        const Reactions: [{}] = blogsData?.reaction;
        const userReaction = Reactions?.find(
          (reaction: any) => reaction?.user == localAuth?.state?.user?._id
        );
        set({
          singleBlog: blogsData,
        });
        return { reactionCounts, userReaction };
      }
      set({
        singleBlog: blogsData,
      });
      // Update the state with the received token

      return { reactionCounts };
      // return blogsData
    } catch (error) {
      console.log(error);
    }
  },

  // Crate Comment
  createComment: async (id, commentData) =>
    set(async (state: BlogState) => {
      try {
        let localAuth: any = localStorage.getItem("Auth");
        localAuth = JSON.parse(localAuth);

        // Make a POST request to the comment endpoint
        const res = await fetch(`${domain}/comment/blog/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localAuth?.state?.token}`,
          },
          body: JSON.stringify(commentData),
        });

        // Parse the response as JSON
        const commentsData = await res.json();
        console.log(commentData);

        await state.getSingleBlog(id);
      } catch (error) {
        console.log(error);
      }
    }),
  // Update Comment
  updateComment: async (id, blogId, commentData) =>
    set(async (state: BlogState) => {
      try {
        let localAuth: any = localStorage.getItem("Auth");
        localAuth = JSON.parse(localAuth);

        // Make a POST request to the comment endpoint
        const res = await fetch(`${domain}/comment/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localAuth.state.token}`,
          },
          body: JSON.stringify({
            content: commentData,
          }),
        });

        // Parse the response as JSON
        const commentsData = await res.json();

        await state.getSingleBlog(blogId);
      } catch (error) {
        console.log(error);
      }
    }),
  // Update Comment
  deleteComment: async (id: string, blogId: string) =>
    set(async (state: BlogState) => {
      try {
        let localAuth: any = localStorage.getItem("Auth");
        localAuth = JSON.parse(localAuth);

        // Make a POST request to the comment endpoint
        const res = await fetch(`${domain}/comment/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localAuth.state.token}`,
          },
        });

        // Parse the response as JSON
        const commentsData = await res.json();
        console.log(blogId, "Deleted blog Id");

        await state.getSingleBlog(blogId);
      } catch (error) {
        console.log(error);
      }
    }),
  // Create Blog
  createBlog: async (blogData, imageData) => {
    console.log(blogData, imageData);
    let localAuth: any = localStorage.getItem("Auth");

    try {
      // Parse the JSON stored in localStorage
      localAuth = JSON.parse(localAuth);
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      // Handle the error gracefully, for example by setting localAuth to null
      localAuth = null;
    }

    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("description", blogData.description);
      formData.append("categories", blogData.categories);
      formData.append("file", imageData);
      // Assume you have an API endpoint to handle blog creation
      const response = await fetch(`${domain}/blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localAuth?.state?.token}`, // Adjust according to your backend requirements
        },
        body: formData,
      });

      if (response.ok) {
        // Handle successful blog creation, e.g., redirect to a success page
        console.log("Blog created successfully");
      } else {
        // Handle error cases
        console.error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  },
});

const useBlogStore = create<BlogState>(BlogStore);
export default useBlogStore;
