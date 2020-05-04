import React, {useState} from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview';
 
function Photo (props) {
    const [hideCamera, setHideCamera] = useState('block');
    const [imagePickerHidden, setImagePickerHidden] = useState('none');
    const [dataUri, setDataUri] = useState('');
 
  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
    setDataUri(dataUri);
  }
  const isFullscreen = false;
  return (
<div 
// style={{width:'20px', height:'20px'}}
>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
          />
          : <Camera style={{width:'20px', height:'20px'}}
          onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={isFullscreen}
          />
      }

<div className='imagePicker' style={{display:`${imagePickerHidden}`}}> 
                 <h6>Pick an image instead</h6>
                 <input type='file' accept='image/*'></input>
             </div>
  </div>
  );
}
 
export default Photo;