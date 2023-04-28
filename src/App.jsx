import { useState } from "react";
import "./App.css";
import Tesseract from 'tesseract.js';
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const handleClick =()=>{
    setIsLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      { logger: m =>{
        console.log(m);
       if(m.status==="recognizing text"){
        setProgress(parseInt(m.progress*100))
       }
      } }
    ).then(({ data: { text } }) => {
      setText(text);
      setIsLoading(false);
    })
  }
  return (
    <>
      <div className="container" style={{ height: "100vh" }}>
        <div className="row h-100">
          <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
            {!isLoading && <h1 className="mt-5 mb-5 pb-5">Image To Text</h1>}

            {/* form */}
            {!isLoading && !text && (
              <>
                <input
                  type="file"
                  className="form-control mt-5"
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <input
                  type="button"
                  className="form-control btn btn-primary mt-4"
                  value="Convert"
                  onClick={handleClick}
                />
              </>
            )}

            {/* progress bar  */}
            {isLoading && (
              <>
                <p className="text-center mt-5">Converting :- {progress}%</p>
              </>
            )}
            {!isLoading && text && (
              <textarea
                className="form-control"
                rows="15"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
