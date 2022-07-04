import fridgeIcon from "./asset/fridge.svg";
import homeBlack from "./asset/screenshot_1_dark.jpg";
import newProductBlack from "./asset/screenshot_2_dark.jpg";
import homeWhite from "./asset/screenshot_1_white.jpg";
import newProductWhite from "./asset/screenshot_2_white.jpg";
import getApp from "./asset/get-app.png";
import "animate.css";
import "./style/App.scss";

function App() {
  return (
    <div>
      <header className="header">
        <div className="icon-header">
          {/* icons container */}
          <img src={fridgeIcon} alt="frigostock icon" className="icon-header" />
          <div className="text-icon-header">Frigostock</div>
        </div>
      </header>
      <main className="">
        <div className="main-container">
          <div className="brand-container">
            <div className="texts-container">
              <div className="text-title">
                partout oû vous voulez et quand vous voulez !
              </div>
              <div className="text-subtitle">
                Gérée votre,frigo,congélateur et même vos étagères
              </div>
              <div className="gets-app-container">
                <div>
                  <img src={getApp} className="gets-app-item" />
                </div>
              </div>
            </div>
            <div className="img"></div>
          </div>
        </div>
      </main>
      <footer className="w-full">
        <div className="">
          <a href="https://github.com/jokay03j/frigostock-app/releases/latest/download/app-release.apk">
            <img src={getApp} className="w-44 h-auto sm:w-auto get-app" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
