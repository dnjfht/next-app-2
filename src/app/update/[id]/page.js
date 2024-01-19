"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const router = useRouter();

  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9999/topics/${id}`) //
      .then((res) => {
        return res.json();
      }) //
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`http://localhost:9999/topics/${id}`, options) //
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
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </p>

      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </p>

      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
