import {MMKV} from 'react-native-mmkv';

const store= new MMKV();

const reduxStorage={
      setItem: (key,value) =>{
            store.set(key,value);
            return Promise.resolve(true);
      },
      getItem: (key) =>{
            return Promise.resolve(store.getString(key));
      },
      removeItem: (key) =>{
            store.delete(key);
            return Promise.resolve(true);
      },

}

export default reduxStorage;