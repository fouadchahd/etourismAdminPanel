import React,{useState,useEffect} from 'react'
import { CircularProgress, Grid} from '@material-ui/core';
import { Button,Hidden } from '@material-ui/core';

import {useDropzone} from 'react-dropzone';
import {storage} from '../firebase'
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:"flex-start",
    marginTop: 16
    };
    const thumb = {
    display: 'inline-flex',
    justifyContent:"flex-start",
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
    position:"relative"
    };
    
    const img = {
    display: 'block',
    justifyContent:'flex-start',
    width: '100%',
    height: '100%',
    borderRadius:'3px',
    };
    
const DragNDrop2 = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setuploading] = useState(false);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
        setFiles(files.concat(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))));
        }
    });
    const handleUploadMupltipleFiles =async()=>{
        (files.length>0) && files.forEach((file)=>{
                                             handleUploadSingleFile(file);
        })
        
    }
    const handleUploadSingleFile = async (file) => {
        const blob = await fetch(file.preview).then((r) => r.blob())
        var now=new Date();
        const uploadTask = storage.ref(`images/${now.getTime()}_${file.name}`).put(blob);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100 * files.length
            ); 
            console.log("progress "+progress);
          },
          error => {
            console.log("error "+error);
          },
          () => {
            storage
              .ref("images")
              .child(`${now.getTime()}_${files[0].name}`)
              .getDownloadURL()
              .then(url => {
                console.log("url "+url);
              });
          }
        );
      };
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    const deleteImg = (e,file)=>{
        e.preventDefault();
        console.log("clicked");
        var array = [...files]; // make a separate copy of the array
        var index = array.indexOf(file)
        if (index !== -1) {
            array.splice(index, 1);
            setFiles(array);
      }
    }        ;
    var alignImageBloc=(files.length>0)?"flex-start":"center";
        const thumbs = files.map(file => (
            <div style={thumb} key={file.name+"_"}>
              <div style={thumbInner}>
                  <img
                  src={file.preview}
                  style={img}
                  />
              </div>
            </div>
        ));
    return (
        <>
        <Grid container>
            <Grid item sm={0} md={2}>
                <Hidden smDown>
                    <div style={{backgroundColor:"gray"}}>
                            <h2>Hiii</h2>
                    </div>
                </Hidden>

               
            </Grid>
            <Grid item sm={12} md={10}>
            <div style={{backgroundColor:"#bababa"}}>
                <section className="container">
                    <div className="dropzone" style={{alignItems:alignImageBloc}}>
                        <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {files[0]?<aside style={{...thumbsContainer}}>
                                {thumbs}
                                </aside>:
                                <p>Faites glisser et déposez quelques fichiers ici, ou cliquez pour sélectionner des fichiers</p>
                        }
                        </div>
                    </div>
                    <p>
                        {files.map((file)=>(
                        <i>{file.name}</i>
                        ))}
                    </p>
                    <Button size="large" color={uploading?"default":"primary"} variant="contained"  onClick={handleUploadMupltipleFiles}>{uploading?  <CircularProgress thickness={4} size={27} color="primary" />:"Ajouter"} </Button>
                   
                </section>
                </div>
            </Grid>
        </Grid>
        </>
    )
}

export default DragNDrop2
