import { Article } from "@/utils/types";

interface SingleArticleProps {
  params: { id: string }
}

export default async function SingleArticle({ params }: SingleArticleProps) {

  const response = await fetch(`http://localhost:3000/api/articles/${params.id}`);
  
  if (!response.ok) {
    throw Error("Failed Fetch Single Article Data");
  }

  const singleArticle: Article = await response.json();

  return (
    <section className=" container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="flex flex-col justify-center  gap-3 bg-white p-7 rounded-lg">
        <h1 className="text-xl font-bold text-gray-800">
          {singleArticle.title}
        </h1>
        <div className="flex justify-between items-center gap-3">
          <p className="text-lg font-thin text-gray-500">UserId: {singleArticle.userId}</p>
          <p className="text-lg font-thin text-gray-500">{singleArticle.time}</p>
        </div>
        <p className="text-lg font-semibold text-gray-700">{singleArticle.body}</p>
      </div>
    </section>
  )
}
