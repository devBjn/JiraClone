import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import Error from "../../components/Error/Error";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiCreateProjectAuthorize } from "../../apis/projectAPI";
import { useNavigate } from "react-router-dom";
import AlertSuccess from "../../components/Alert/AlertSuccess";
import AlertError from "../../components/Alert/AlertError";

const schema = yup.object({
  projectName: yup.string().required("Project name is required !!!"),
  categoryId: yup.string().required("Category is required !!!"),
});
export default function CreateProject() {
  const { projectCategory, error } = useSelector(
    (state) => state.projectReducer
  );
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: "",
      description: "",
      categoryId: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        categoryId: parseInt(values.categoryId),
        description: editorRef.current.getContent(),
        alias: values.projectName,
      };
      const data = await apiCreateProjectAuthorize(payload);
      if (data) {
        AlertSuccess("Create project successfully !!!");
        navigate("/");
      }
    } catch (error) {
      AlertError(error?.response?.data?.content);
    }
  };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <div className="flex pt-10 ps-5 flex-col w-4/5">
        <h1 className="text-3xl font-semibold">Create Project</h1>
        {error && <Error error={error} />}
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit, onError)} className="w-4/5">
            <div className="mb-6">
              <label
                htmlFor="projectName"
                className="block mb-2 text-sm font-semibold text-gray-900 "
              >
                Project name
              </label>
              <Input control={control} projectField={true} name="projectName" />
              {errors.projectName && (
                <p className="text-red-600 font-medium mt-2">
                  {errors.projectName.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-semibold text-gray-900"
              >
                Description
              </label>

              <Editor
                apiKey="ka4359j8d9m8qkswsi2zvjs4pzb2fzsl6pbap06r9btfhxvd"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>
            <div className="mb-6">
              <div>
                <label
                  htmlFor="categoryId"
                  className="block mb-2 text-sm font-semibold text-gray-900"
                >
                  Choose a category
                </label>
                <select
                  id="categoryId"
                  {...register("categoryId")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {projectCategory?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.projectCategoryName}
                      </option>
                    );
                  })}
                </select>
                {errors.categoryId && (
                  <p className="text-red-600 font-medium mt-2">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
            </div>

            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Create Project
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
