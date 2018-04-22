/**
 * Created by sanjithkumar017 on 20/2/18.
 */
import axios from 'axios';

const fetchPnr = (pnr)=> {
    var encodedURI = window.encodeURI(RAIL_URL + pnr + "/apikey/" + RAIL_KEY + "/")
    //var encodedURI = window.encodeURI('http://10.0.3.6:8083/snip/snippets/')

    axios.interceptors.request.use(request => {

        return request
    })

    axios.interceptors.response.use(response => {

        return response
    })


    return axios.get(encodedURI).then((response)=> {

        return response.data
    })
}
export default fetchPnr;