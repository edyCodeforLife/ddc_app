import{ ADDREGISTRASI } 
from './action';
import _ from 'lodash';


export default (state, action){
    switch(action.type){
        case ADDREGISTRASI :
        const newdataRegistrasi = Object.assign({},state.dataRegistrasi);
        newdataRegistrasi.dataRegistrasi = action.data;
        return newdataRegistrasi;
        default :
        return state;

    }
}
