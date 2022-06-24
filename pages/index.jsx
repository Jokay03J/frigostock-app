import fridgeIcon from "../asset/fridge.svg";
import "react-alice-carousel/lib/alice-carousel.css";
import homeBlack from "../asset/screenshot_1_dark.jpg";
import newProductBlack from "../asset/screenshot_2_dark.jpg";
import homeWhite from "../asset/screenshot_1_white.jpg";
import newProductWhite from "../asset/screenshot_2_white.jpg";
import getApp from "../asset/get-app.png";
import "animate.css";

export default function Home() {
  return (
    <div>
      <header className="flex p-5 w-full">
        <div className="flex float-right">
          {/* icons container */}
          <img
            src={fridgeIcon.src}
            alt="frigostock icon"
            className="w-10 h-10 md:w-16 md:h-16 flex justify-start"
          />
          <div className="text-3xl md:text-5xl my-auto">Frigostock</div>
        </div>
      </header>
      <main className="flex-row flex flex-wrap justify-center animate__animated animate__bounceIn drop-shadow-md">
        <img src={homeBlack.src} className="h-96 m-2" />
        <img src={newProductBlack.src} className="h-96 m-2" />
        <img src={homeWhite.src} className="h-96 m-2" />
        <img src={newProductWhite.src} className="h-96 m-2" />
      </main>
      <footer className="w-full">
        <div className="get-app flex justify-center">
          <a href="https://github.com/jokay03j/frigostock-app/releases/latest/download/app-release.apk">
            <img src={getApp.src} className="w-44 h-auto sm:w-auto"/>
          </a>
        </div>
      </footer>
    </div>
  );
}
