import { useState } from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Compressor from 'compressorjs'

/** @param setImage setState method from parent **/
const Uploader = ({ setImage }) => {

  const [previewImg, setPreviewImg] = useState(undefined)

  const onFileChange = file => {
    // compress and save in parenet's state
    new Compressor(file, {
      maxWidth: 200,
      maxHeight: 200,
      success: getBase64,
    })
  }

  function getBase64(img) {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = (e) => {
      const base64Result = e.target.result
      // console.log(base64Result)
      setImage(base64Result)
      setPreviewImg(base64Result)
      // document.getElementById('img11111').src = base64Result
    }
    // reader.addEventListener('load', () => { base64Result = reader.result });
  }

  return (
    <div>
      <input type="file"
        name="avatar"
        onChange={(e) => onFileChange(e.target.files[0])}
        accept="image/png, image/jpeg">
      </input>
      <Avatar size="large"
        icon={<UserOutlined />}
        src={previewImg}
      />
    </div>
  );
}
export default Uploader;