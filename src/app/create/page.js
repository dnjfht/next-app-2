"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const body = e.target.body.value;

        const options = {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch("http://localhost:9999/topics", options) //
          .then((res) => res.json()) //
          .then((result) => {
            console.log(result);
            const lastId = result.id;

            router.push(`/read/${lastId}`);

            router.refresh();
            // 데이터가 cache되고 있지 않기 때문에
            // refresh를 하면 서버 컴포넌트가 새로 데이터를 가져와서 뿌려주게 됨.
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>

      <p>
        <textarea name="body" placeholder="body" />
      </p>

      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
