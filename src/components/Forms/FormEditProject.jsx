import React, { useEffect, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../Input/Input";
import { Editor } from "@tinymce/tinymce-react";
import Error from "../Error/Error";
import { useSelector } from "react-redux";
import { apiUpdateProject } from "../../apis/projectAPI";
import { useDispatch } from "react-redux";
import { getAllProject } from "../../slices/projectSlice";
import AlertSuccess from "../Alert/AlertSuccess";
import AlertError from "../Alert/AlertError";
import { closeModalProject } from "../../slices/modalSlice";

const schema = yup.object({
  projectName: yup.string().required("Project name is required !!!"),
  categoryId: yup.string().required("Category is required !!!"),
});

export default function FormEditProject({ reference }) {
  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => state.modalReducer);
  const { projectCategory, error } = useSelector(
    (state) => state.projectReducer
  );

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      projectName: "",
      categoryId: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const onError = (errors) => {
    console.log(errors);
  };
  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        description: editorRef.current.getContent(),
        categoryId: values.categoryId,
        creator: projectDetail?.creator?.id,
      };
      const data = await apiUpdateProject(payload);
      if (data) {
        await AlertSuccess("Update project successfully !!!");
        dispatch(getAllProject());
        dispatch(closeModalProject());
      }
    } catch (error) {
      AlertError(error?.response?.data?.content);
    }
  };

  useEffect(() => {
    if (projectDetail) {
      reset({
        id: projectDetail?.id || "",
        projectName: projectDetail?.projectName || "",
        categoryId: projectDetail?.categoryId || "",
      });
    }
  }, [projectDetail]);
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {error && <Error error={error} />}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <label
            htmlFor="id"
            className="block mb-2 text-sm font-semibold text-gray-900 "
          >
            Project Id
          </label>
          <Input disabled control={control} projectField={true} name="id" />
        </div>
        <div>
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
          initialValue={projectDetail?.description}
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
    </form>
  );
}
