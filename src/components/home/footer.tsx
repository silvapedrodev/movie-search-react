import Image from "next/image";

const studios = [
  "amc.svg",
  "apple.svg",
  "disney.svg",
  "hbo.svg",
  "hulu.svg",
  "looke.svg",
  "paramount.svg",
  "peacock.svg",
  "sony.svg",
  "warner.svg"
];

export const FooterHome = () => {
  return (
    <footer className="mt-12 md:mt-18 border-t space-y-15 border-gray-700 py-6 text-sm">
      <div className="flex flex-col gap-3.5 md:gap-12 justify-center items-center mx-auto md:max-w-4xl">
        <h3 className="text-xl md:text-5xl">Streaming</h3>
        <div className="grid grid-cols-5 gap-4 w-full px-4 md:px-4">
          {studios.map(img => (
            <div
              key={img}
              className="bg-white w-full aspect-square flex items-center justify-center rounded-xl md:rounded-[40px] p-1.5">
              <Image
                src={`/studios/${img}`}
                alt={img}
                width={200}
                height={200}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-6 justify-center text-gray-500">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          GitHub &gt;
        </a>
        <a href="https://www.themoviedb.org/documentation/api" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          TMDB API &gt;
        </a>
        <a href="#" className="hover:text-white">
          Privacy Policy &gt;
        </a>
        <a href="" className="hover:text-white">
          Help &gt;
        </a>
        <a href="" className="hover:text-white">
          Contact &gt;
        </a>
      </div>
    </footer>
  )
}