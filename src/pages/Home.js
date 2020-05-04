import React, {useState, useEffect} from 'react';
import Webcam from 'react-webcam';
import ImagePreview from './ImagePreview';
import './Home.css';
import {dataURItoBlob} from '../Utility/Utility';
import axios from 'axios';

// const Home = () => {
//     const [videoSrc, setVideoSrc] = useState(null);
//     const [imagePickerHidden, setImagePickerHidden] = useState('none');
//     useEffect(() => {
//         // const initializeMedia = () => {
//             // if(!('mediaDevices' in navigator)) {
//             //     navigator.mediaDevices = {};
//             // }
//             // if(!('getUserMedia' in navigator.mediaDevices)) {
//             //     navigator.mediaDevices.getUserMedia = (constraints) => {
//             //         let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//             //         if (!getUserMedia) {
//             //             return Promise.reject(new Error('getUserMedia is not implemented'));
//             //         }

//             //         return new Promise((resolve, reject) => {
//             //             getUserMedia.call(navigator, constraints, resolve, reject);
//             //         });
//             //     }
//             // }
//             // navigator.mediaDevices.getUserMedia({video:true})
//             // .then((stream) => {
//             //     setVideoSrc(window.URL.createObjectURL(stream));
//             // })
//             // .catch((err) => {
//             //     setImagePickerHidden('block');
//             // });
//         // }
//         navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
//         if (navigator.getUserMedia) {
//             navigator.getUserMedia({video: true}, handleVideo, videoError);
//         }
//     },[]);
//     const handleVideo = (stream) => {
//         // Update the state, triggering the component to re-render with the correct stream
//         setVideoSrc(stream);
//       };
//     const videoError = () => {

//     };
//     return (
//         <div className="layout">
//             {/* Home */}
//             <video src={videoSrc} autoPlay='true'></video>
//             <canvas style={{width:'320px', height:'240px'}}></canvas>
//             <button>Capture</button>
//             {/* <div>
//             <video width="250">
//                 <source src={videoSrc}
//                         type="video/webm" />

//                 <source src={videoSrc}
//                         type="video/mp4" />

//                 Sorry, your browser doesn't support embedded videos.
//             </video>
//             </div> */}
//             <div className='imagePicker' style={{display:`${imagePickerHidden}`}}>
//                 <h6>Pick an image instead</h6>
//                 <input type='file' accept='image/*'></input>
//             </div>
//         </div>
//     );
// }

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const Home = () => {
  const webcamRef = React.useRef(null);
  // const canvasRef = React.useRef(null);
  // const [imageSrc, ImageSrc] = useState(null);
  // const [imagePickerHidden, setImagePickerHidden] = useState('none');
  const [hideCamera, setHideCamera] = useState('block');
  // const [hideCanvas, setHideCanvas] = useState('none');
  const [dataUri, setDataUri] = useState('');
  const [pictureFile, setPictureFile] = useState('');
  const [image, setImage] = useState("");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setDataUri(imageSrc);
    setPictureFile(dataURItoBlob(imageSrc));
  }, [webcamRef]);

  const handleShare = (e) => {
    e.preventDefault();
    let postData = new FormData();
    postData.append('image', pictureFile, +'.png');

    axios.post('http://localhost:5000/User/UserImage', postData, {
      withCredentials: true,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
  };

  const handleGetImage = () => {
    axios.get('http://localhost:5000/User/UserImage', {
        withCredentials: true,
      }).then(response => {
          console.log(response);
          setImage(response);
      })
      .catch(err => {
          console.log(err);
      });
  }
  return (
    <div className="layout">
      <div>
        {dataUri ? (
          <ImagePreview
            dataUri={dataUri}
            // isFullscreen={isFullscreen}
          />
        ) : (
          <Webcam
            style={{display: `${hideCamera}`}}
            audio={false}
            height={380}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={383}
            videoConstraints={videoConstraints}
          />
        )}

        <button onClick={capture}>Capture photo</button>
        {/* <div className='imagePicker' style={{display:`${imagePickerHidden}`}}> 
                 <h6>Pick an image instead</h6>
                 <input type='file' accept='image/*'></input>
             </div> */}
      </div>
      <div>
        <button onClick={handleShare}>Share</button>
      </div>

      <div>
          <button onClick={handleGetImage}>Get Images</button>
          <img src={image} alt="Not found"></img>
      </div>
    </div>
  );
};

export default Home;
