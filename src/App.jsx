import { useState, useEffect } from "react";

export default function QuizGame() {
  const [timer, setTimer] = useState(3840);
  const [isRunning, setIsRunning] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [slideNumber, setSlideNumber] = useState(1);
  const [highlightedChoice, setHighlightedChoice] = useState(null); // 選択肢のハイライト状態
  const [showSlide, setShowSlide] = useState(false);
  const [choiceImages, setChoiceImages] = useState({
    c: "/materials/Q1/n1c.png",
    m: "/materials/Q1/n1m.png",
    y: "/materials/Q1/n1y.png"
  });
  const[x,setX]=useState(0);
  const[yl,setYL]=useState(0);
  const[yr,setYR]=useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setChoiceImages({
      c: `/materials/Q${questionNumber}/n${questionNumber}c.png`,
      m: `/materials/Q${questionNumber}/n${questionNumber}m.png`,
      y: `/materials/Q${questionNumber}/n${questionNumber}y.png`
    });
  }, [questionNumber]);
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        setQuestionNumber((prev) => Math.max(1, event.key === "ArrowUp" ? prev + 1 : prev - 1));
        setHighlightedChoice(null);
      }else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        setSlideNumber((prev) => Math.max(1, event.key === "ArrowLeft" ? prev - 1 : prev + 1));
      }else if (event.key === " ") {
        setIsRunning((prev) => !prev);
      }else if(["0","A","D","E","F","H","I","J","L","N"].includes(event.key.toUpperCase())){
        const key = event.key;
        setChoiceImages((prev) => ({
          ...prev,
          m: `/materials/Q7/70${key}.png`
        }));
        setHighlightedChoice("m");
        console.log(key,'キーだね' );
      }
      else if(["0","A","D","E","F","H","I","J","L","N"].includes(event.key.toUpperCase()) && event.ctrlKey){
        const key = event.key;
        setChoiceImages((prev) => ({
          ...prev,
          m: `/materials/Q7/71${key}.png`
        }));
        setHighlightedChoice("m");
        console.log(key,'キーだね' );
      }else if(["0","A","D","E","F","H","I","J","L","N"].includes(event.key.toUpperCase()) && event.shift){
        const key = event.key;
        setChoiceImages((prev) => ({
          ...prev,
          m: `/materials/Q7/72${key}.png`
        }));
        setHighlightedChoice("m");
        console.log(key,'キーだね' );
      } else if (event.code === "KeyS") {
        setShowSlide((prev) => !prev);
      } else if (event.code === "KeyM") {
        setX(-20);
        setYL(360);
        setYR(360);
        setHighlightedChoice("m");
        
      } else if (event.code === "KeyC") {
        setX(-20);
        setYL(-10);
        setYR(720);
        setHighlightedChoice("c");
      } else if (event.code === "KeyY") {
        setX(-20);
        setYL(720);
        setYR(-10);
        setHighlightedChoice("y");
      } else if (event.code === "KeyR") {
        setChoiceImages((prev) => ({
          ...prev,
          m: `/materials/Q${questionNumber}/n${questionNumber}r.png`,
          y: `/materials/Q${questionNumber}/n${questionNumber}r.png`
        }));
        setX(-20);
        setYL(360);
        setYR(360);
        setHighlightedChoice("m");

      } else if (event.code === "KeyG") {
        setChoiceImages((prev) => ({
          ...prev,
          c: `/materials/Q${questionNumber}/n${questionNumber}g.png`,
          y: `/materials/Q${questionNumber}/n${questionNumber}g.png`
        }));
        setX(-20);
        setYL(-10);
        setYR(720);
        setHighlightedChoice("c");

      }else if (event.code === "KeyB") {
        setChoiceImages((prev) => ({
          ...prev,
          c: `/materials/Q${questionNumber}/n${questionNumber}b.png`,
          m: `/materials/Q${questionNumber}/n${questionNumber}b.png`
        }));
        setX(-20);
        setYL(360);
        setYR(360);
        setHighlightedChoice("m");
        setYL(-10);
        setYR(720);
        setHighlightedChoice("c");

      }else if (event.code === "KeyK") {
        setChoiceImages((prev) => ({
          ...prev,
          c: `/materials/Q${questionNumber}/n${questionNumber}k.png`,
          m: `/materials/Q${questionNumber}/n${questionNumber}k.png`,
          y: `/materials/Q${questionNumber}/n${questionNumber}k.png`
        }));
        setX(-20);
        setYL(360);
        setYR(360);
        setHighlightedChoice("m");

      }else if (event.code==="KeyV"){
        setChoiceImages((prev) => ({
          ...prev,
          c: `/materials/Q${questionNumber}/n${questionNumber}c_add.png`
        }));
      }else if (event.code==="KeyW"){
        setChoiceImages((prev) => ({
          ...prev,
          m: `/materials/Q${questionNumber}/n${questionNumber}m_add.png`
        }));
      }else if (event.code==="KeyX"){
        setChoiceImages((prev) => ({
          ...prev,
          y: `/materials/Q${questionNumber}/n${questionNumber}y_add.png`
        }));
      }else if (event.key === "Escape") {
        setHighlightedChoice(null);
        setChoiceImages({
          c: `/materials/Q${questionNumber}/n${questionNumber}c.png`,
          m: `/materials/Q${questionNumber}/n${questionNumber}m.png`,
          y: `/materials/Q${questionNumber}/n${questionNumber}y.png`
        });
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [questionNumber]);

  
  const formatTime = (seconds) => {
    return seconds.toString(8); // 8進数に変換
  };
  

  const questionImage = `/materials/Q${questionNumber}/n${questionNumber}p.png`;
  const questionFrameL = "/materials/frame_left.png";
  const questionFrameR = "/materials/frame_right.png";

  return (
    <div className="bg-cover" style={{ backgroundImage: "url('/materials/background.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh" }}>
      
      {showSlide && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url('/materials/slides/s${slideNumber}.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1000
        }} />
      )}

      {/* ヘッダー */}
      <p className="custom-font" style={{position: "absolute", top: "0px", marginLeft: '120px', color: 'white', fontSize: '8rem' }}>
        {formatTime(questionNumber)}
      </p>
      <p className="header custom-font2" style={{marginLeft:"20pt", marginTop: '40pt', color: 'white', fontSize: '4rem' }}>
        のお
      </p>
      <p className="header custom-font2" style={{ marginLeft: '200pt', marginTop: '40pt', color: 'white', fontSize: '6rem' }}>
        えとらんじえ
      </p>
      <p className="header custom-font" style={{ marginLeft: '60pt', marginTop: '40pt', color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
        
      </p>
      <p className="custom-font" style={{ position: "absolute", top: "0px", right: "40px", textAlign: "right", color: "white", fontSize: "7rem", paddingTop: "0pt", paddingBottom: "0pt", width: "auto", border: "3px dashed" }}>
        {formatTime(timer)}
      </p>

      {/* 問題画像 */}
      <div>
        <img className="question" src={questionImage} alt="問題画像" style={{ position: "absolute", left: "10%", width: "80%", height: "300pt", objectFit: "cover"}} />
        <img src={questionFrameL} alt="問題枠" style={{ position: "absolute", left: "90%", width: "10%", height: "300pt", objectFit: "cover" }} />
        <img src={questionFrameR} alt="問題枠" style={{ position: "absolute", left: "0%", width: "10%", height: "300pt", objectFit: "cover" }} />
      </div>

      {/* 選択肢 */}
      <div className="choice-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", bottom: "2.5%", width: "100%",
        backgroundColor: "rgba(0,0,0,0)"
      }}>
        {Object.entries(choiceImages).map(([key, src]) => (
          <div key={key} style={{
            marginLeft: "30px",
            marginRight: "30px",
            textAlign: "center"
          }}>
            <img 
              src={src} 
              alt={`選択肢 ${key}`} 
              style={{
                
                height: "190pt",
                objectFit: "cover",
                filter: highlightedChoice === key ? "brightness(1.1)" : "none"
              }} 
            />
            {highlightedChoice === key && (
              <>
                <img src="/materials/frame_corner.png" alt="枠左上" style={{zIndex:"2", position:"absolute", top: `${x}pt`, left: `${yl}pt`, width: "100px", height: "90px", transform:"scaleX(-1)" }} />
                <img src="/materials/frame_corner.png" alt="枠右上" style={{zIndex:"2", position:"absolute", top: `${x}pt`, right: `${yr}pt`, width: "100px", height: "90px" }} />
                <img src="/materials/frame_corner.png" alt="枠左下" style={{ zIndex:"2", position:"absolute", bottom: "-20px", left: `${yl}pt`, width: "100px", height: "90px", transform: "rotate(180deg) " }} />
                <img src="/materials/frame_corner.png" alt="枠右下" style={{ zIndex:"2", position:"absolute", bottom: "-20px", right: `${yr}pt`, width: "100px", height: "90px", transform: "rotate(180deg) scaleX(-1)" }} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
