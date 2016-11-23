import Vue from 'vue';
import VueContextable from '../../../dist';
import {Context} from 'contextable';
import userSchema from './schemas/user';

Vue.use(VueContextable);

const context = new Context(); // initializing application context

context.defineModel('User', userSchema); // defining a model

export default context;
