import lavaCapsule from "../media/lava_capsule.png";
import Button from "../components/Button";
import "./Home.css";

export default function Home() {
  return (
    <div className="frontPageContent">
      <div className="frontCarousel">
        <img src={lavaCapsule} className="lavaCover" alt="lava-cover" />
        <div className="phraseBlock">
          <div className="catchPhrase">Closer to your machine's heart.</div>
          <div className="description">
            Modern systems language for efficient & maintainable software...
          </div>
          <div className="actions">
            <Button name="Download" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

