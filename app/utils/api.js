/**
 * Created by sanjithkumar017 on 20/2/18.
 */
import axios from 'axios';

const fetchPnr = (pnr)=> {
    var encodedURI = window.encodeURI(RAIL_URL + pnr + "/apikey/" + RAIL_KEY + "/")
    //var encodedURI = window.encodeURI('http://10.0.3.6:8083/snip/snippets/')

    axios.interceptors.request.use(request => {
        console.log('Starting Request', request)
        return request
    })

    axios.interceptors.response.use(response => {
        console.log('Response:', response)
        return response
    })


    return axios.get(encodedURI).then((response)=> {
        console.log("this is what we have ", response);
        return response.data
    })
}
export default fetchPnr;