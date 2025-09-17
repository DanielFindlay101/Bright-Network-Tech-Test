import Image from "next/image";
export interface Props {
  className: string;
  title: string;
  description: string;
  icon: string;
}

export default function Card({ className, title, description, icon }: Props) {
  return (
    <div className=" relative border border-slate-300 rounded-lg w-full md:w-1/4 p-12 shadow-xl shadow-slate-200">
      <span
        className={`${className} absolute bottom-[50%] left-[-25px] w-12 h-12 z-10 rounded-full
         border-2 flex items-center justify-center`}
      >
        <Image src={icon} alt="clipboard" />
      </span>
      <p className="text-slate-950 font-bold">{title}</p>
      <p className="text-slate-800 text-sm">{description}</p>
    </div>
  );
}
