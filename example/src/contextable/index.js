import Vue from 'vue';
import VueContextable from '../../../dist';
import {Context} from 'contextable';
import {userSchema} from './schemas/users';

Vue.use(VueContextable); // installing the plugin

const context = new Context(); // initializing application context

context.defineModel('User', userSchema); // defining a model

export default context;
