import { API } from '../utils/config';
import RestClient from '../utils/RestClient';

const saveDoc = (inlineEditorHtml, fileName) => {
    let formData = new FormData();
    formData.append('filename', fileName);
    formData.append('inlineEditorHtml', inlineEditorHtml);

    return RestClient.Post(API + "/saveDoc", formData, true, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            'Access-Control-Allow-Origin': '*'        
        }
    });
}

const uploadDoc = (file, taskId) => {
    let formData = new FormData();
    formData.append('file', file)
    formData.append('taskId', taskId)

    return RestClient.PostAuth(API + "/uploadDoc", formData, true, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            'Access-Control-Allow-Origin': '*'  
        }
    });
}

const convertFileToHTML = (fileName) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`);
    let requestOptions = {
        headers: myHeaders,
        method: 'POST'
    };

    return fetch(`${API}/downloadDoc/${fileName}`, requestOptions);
}

export { saveDoc, uploadDoc, convertFileToHTML }