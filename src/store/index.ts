import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import state from './state';
import { actions } from './actions';
// import { Istore } from '@/types/store';
Vue.use(Vuex);

// export default new Vuex.Store<RootState>( store )
// TODO 型整理
export const store = new Vuex.Store<any>({
  getters,
  state,
  mutations,
  actions,
});

export default store;
