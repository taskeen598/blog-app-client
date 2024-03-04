'use client'
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCategoriesStore from "@/zustand/category.zustand";
import useBlogStore from "@/zustand/blog.zustand";
import "./writeblog.css";

const WriteBlog = () => {
  const router = useRouter();
  const { categories, getAllCategories } = useCategoriesStore();
  const { createBlog } = useBlogStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    categories: "",
  });

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      categories: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file:any = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      createBlog(blogData,selectedImage);
      // Clear form fields after successful submission
      setBlogData({
        title: "",
        description: "",
        categories: "",
      });
      setSelectedImage(null);
      setImagePreview(null);
      router.push("/");
    } catch (error) {
      console.error("Error while creating blog:", error);
    }
  };

  return (
    <form className="container-blog mt-40" onSubmit={handleFormSubmit}>
      <div className="modal-blog border border-dashed border-slate-400">
        <div className="modal__header-blog bg-blue-300 rounded-md py-8">
          <p className="modal__title-blog text-center font-bold text-lg text-white uppercase">
            Create blog
          </p>
        </div>
        <div className="modal__body-blog">
          {/* Input fields for title and description */}
          <div className="input-blog">
            <label className="input__label-blog text-left text-[#8099B9]">
              Title
            </label>
            <input
              className="input__field-blog"
              type="text"
              name="title"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-blog">
            <label className="input__label-blog text-left text-[#8099B9]">
              Description
            </label>
            <textarea
              className="input__field-blog input__field--textarea-blog"
              name="description"
              onChange={handleInputChange}
            ></textarea>
          </div>
          {/* Select input for categories */}
          <div className="flex justify-start items-start gap-2 p-3 flex-col">
            <p className="text-[#8099B9] text-left">Category</p>
            <select
              className="select p-2 select-bordered border border-dashed border-slate-400 text-[#8099B9]  bg-white rounded-sm w-full max-w-xs"
              name="categories"
              onChange={handleCategoryChange}
            >
              <option disabled value="" className="capitalize">
                Select Category
              </option>
              {categories.map((category: any) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="capitalize"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Image upload */}
          <div className="modal__footer-blog text-right mt-2">
            <label
              htmlFor="file"
              className="button button--primary-blog bg-blue-300 text-white rounded-md px-4 py-2 cursor-pointer"
            >
              Upload Image
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {/* Display image preview */}
            {selectedImage && (
              <div className="mt-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto"
                  />
                ) : (
                  <span>Loading image preview...</span>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Submit button */}
        <div className="modal__footer-blog text-right mt-2">
          <button
            type="submit"
            className="button button--primary-blog bg-blue-300 text-white rounded-md px-4 py-2"
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default WriteBlog;
