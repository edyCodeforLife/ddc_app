import React from 'react';
import {Col, Icon, message} from 'antd';
import {connect} from 'react-redux';
import constant from './../../utils/configs/constant';
import validationMessages from '../../utils/configs/validationMessages';
import * as actions from '../../actions/index';

const UploadPhoto = ({url_photo, doUpload, uploadPhoto})=>{
    return(
        <div className="container-photo-detail">
            { url_photo == '' ? 
            <label htmlFor="photo_url" style={{cursor:"pointer"}}>
                <div className="container__no__image">
                        <img src="" />
                </div>
            </label>
            
            :

            <div className="file-container" style={{width: "100%"}}>
                    <img  src={url_photo} />
            </div>
            }

            <input type="file" onChange={e => doUpload(e, uploadPhoto)} style={{display:"none"}} name="photo_url" id="photo_url"/>

        </div>
    )

}

const doUpload = (e, uploadPhoto)=>{
        e.preventDefault();
        let fileExt = '';
        const file = e.target.files[0];
        if(file != undefined){
            fileExt = file.name.split('.').pop();
        }
        if(! (fileExt.toUpperCase() == Constant.FILE_JPG || 
        fileExt.toUpperCase() == Constant.FILE_JPEG ||
        fileExt.toUpperCase() == Constant.FILE_PNG)){
            // ModalComponent({
            //     type:Constant.MODAL_ERROR,
            //     title: 'Gagal',
            //     content: 'Format File Harus ' + Constant.FILE_JPG + '/' + Constant.FILE_JPEG + '/' + Constant.FILE_PNG + '/'
            // })
        }else{
            let formData = new FormData();
            formData.append('file', file);
            uploadImg(formData).then(response=>{
            const data = response.data;
            if(data.message === 'OK'){
                let filePath = '';
                filePath = data.result;
                console.log(filePath);
                uploadPhoto(filePath);
                message.success('Berhasil upload photo');
            }
            // else{   
            //     ModalComponent({
            //         type:Constant.MODAL_ERROR,
            //         title: 'Gagal',
            //         content: response.data.result
            //     })
            // }
            }).catch(error=>{
                console.log(error);
            })
        }
}

const mapStateToProps = (state)=>{(
    photo: state.get('updateProfil').formData.image,
)}

const mapDispatchToProps = (dispatch)=>{
    return{
        uploadPhoto : (url)=> {
            dispatch(uploadPhoto(url))
        },

        doUpload :  (e, func) => doUpload(e, func)

    }
}

export default connect (mapStateToProps, mapDispatchToProps) (UploadPhoto);

connect (null, mapDispatchToProps)(doUpload);