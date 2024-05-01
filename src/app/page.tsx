import Link from "next/link";

export default function Home() {  
  
  return (
    <div className="w-full h-[86vh] flex justify-center items-center flex-col gap-7">
     <h1 className="text-xl font-bold ">Home Page</h1>
     <Link className="text-xl bg-purple-700 hover:bg-purple-900 w-max block text-center p-1 text-white rounded-lg" href={'../articles'}>Articles</Link>
   </div>
  );
}
