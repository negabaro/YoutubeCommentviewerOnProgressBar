import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import state from './state';
import { actions } from './actions';
import window from '../utils/window';
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
// declare window;
// (window as any).store = store;

// (window as MyWindow & typeof globalThis).store = store;

// (window as MyWindow).store = store;
/*
declare global {
  interface Window {
    foo: string;
  }
} */

// (window as MyWindow & typeof globalThis).store = store;
window.store = store;
export default window.store;
