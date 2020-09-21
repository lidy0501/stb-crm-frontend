import ElementUI from 'element-ui';
import {loadingConfig} from '../config/load' //全局的一个基本参数配置

var loading = null ;
const loadingShow = () => {
  loading = ElementUI.Loading.service(loadingConfig);
}

const loadingHide = () => {
  loading.close();
}

const loadingObj={
  loadingShow,
  loadingHide
}

export default loadingObj