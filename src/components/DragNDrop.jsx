import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { storage } from '../firebase'
import '../../node_modules/react-dropzone/examples/theme.css';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  position: "relative"
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: '3px',

};

const deleteImageBtn = {
  position: "absolute",
  right: "3px",
  top: "3px"
};


const DragNDrop = (props) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(files.concat(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))));
    }
  });

  const deleteImg = (e, file) => {
    e.preventDefault();
    console.log("clicked");
    var array = [...files]; // make a separate copy of the array
    var index = array.indexOf(file)
    if (index !== -1) {
      array.splice(index, 1);
      setFiles(array);
    }
  }
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
        <button onClick={(e) => deleteImg(e, file)} style={deleteImageBtn}>X</button>
      </div>
    </div>
  ));
  const handleUpload = async () => {
    const blob = await fetch(files[0].preview).then((r) => r.blob())
    const uploadTask = storage.ref(`images/salam`).put(blob);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("progress " + progress);
      },
      error => {
        console.log("error " + error);
      },
      () => {
        storage
          .ref("images")
          .child("salam")
          .getDownloadURL()
          .then(url => {
            console.log("url " + url);
          });
      }
    );
  };
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div className="dropzone">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {files[0] ? <aside style={{ thumbsContainer, justifyContent: "flex-end" }}>
            {thumbs}
          </aside> :
            <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </div>


      <p>{files.map((file) => (
        <i>{file.name}</i>
      ))}</p>
      <Button color="secondary" variant="contained" onClick={(e) => handleUpload(e)}>upload</Button>
    </section>
  );
}

export default DragNDrop;
