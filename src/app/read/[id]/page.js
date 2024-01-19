// 사용자와 상호작용하지 않는 페이지(SSR)

export default async function Read(props) {
  const res = await fetch(`http://localhost:9999/topics/${props.params.id}`, {
    cache: "no-store",
  });
  const topic = await res.json();

  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}
