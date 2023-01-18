import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface UploadPostForm {
  question: string;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadPostForm>();

  const [uploadPost, { loading, data }] = useMutation("/api/communities");

  const onValid = (data: UploadPostForm) => {
    if (loading) return;
    uploadPost(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data]);

  return (
    <Layout canGoBack title="Write Post">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <TextArea
          required
          placeholder="Ask a question!"
          register={register("question", { required: true })}
        />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
