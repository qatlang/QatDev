import lavaCapsule from "../media/lava_capsule.png";
import Button from "../components/Button";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="frontPageContent">
      <div className="frontCarousel">
        <img src={lavaCapsule} className="lavaCover" alt="lava-cover" />
        <div className="phraseBlock">
          <div className="catchPhrase">Closer to your machine's heart 🦾</div>
          <div className="description">
            Super-fast modern systems language for efficient & maintainable
            software...
          </div>
          <div className="prompts">
            <Button
              content="Download"
              onClick={() => {
                navigate("/downloads");
              }}
            />
            <Button
              content="Try it Online"
              onClick={() => {
                navigate("/playground");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

