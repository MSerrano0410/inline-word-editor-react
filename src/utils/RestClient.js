import axios from 'axios'
import { store } from "../Redux/store/Store";

const Get = async (endPointUrl, showMsg = true) => {
    return axios
        .get(endPointUrl, { timeout: 300000 })
        .then((response) => {
            if (response?.data?.message) {
                if (showMsg) {
                    store.dispatch(setNotification({ message: response.data?.message, type: response.data?.status === "failure" ? "danger" : "success" }));
                }
            } else if (response?.data?.validationErrors?.Error) {
                store.dispatch(setNotification({ message: response.data?.validationErrors?.Error, type: 'danger'}));
            }

            return response; 
        })
        .catch(async (error) => {
            console.error('error in axios Get', error);
            throw Error("Network Error");
        })
}

const Post = async (
    endPointUrl,
    data,
    showMsg = true,
    config = {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        timeout: 300000
    }
) => {
    return axios
    .post(endPointUrl, data, config)
    .then((response) => {
        if (response?.data?.message) {
            if (showMsg) {
                store.dispatch(setNotification({ message: response.data?.message, type: response.data?.status === "failure" ? "danger" : "success"}));
            }
        } else if (response?.data?.validationErrors?.Error) {
            store.dispatch(setNotification({ message: response.data?.validationErrors?.Error, type: "danger" }));
        }
        return response;
    }).catch((error) => {
        console.error("Error in axios Post", error);
        throw Error("Network Error");
    })
}

export default { Get, Post };