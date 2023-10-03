(function(){"use strict";var t={5502:function(t,e,s){var a=s(144),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("nav",[e("router-link",{attrs:{to:"/"}},[t._v("Главная")])],1),e("router-view")],1)},o=[],r=s(1001),i={},u=(0,r.Z)(i,n,o,!1,null,null,null),l=u.exports,c=s(8345),k=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main"},[e("h1",[t._v("Добро пожаловать в менеджер задач!")]),e("router-link",{attrs:{to:"/tasks"}},[e("button",{staticClass:"next"},[t._v("Перейти к задачам!")])])],1)},d=[],v={name:"HomePage"},T=v,f=(0,r.Z)(T,k,d,!1,null,null,null),m=f.exports,p=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("h2",[t._v("Лист задач")]),e("div",{staticClass:"add"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask,expression:"newTask"}],attrs:{type:"text",placeholder:"Добавить новую задачу"},domProps:{value:t.newTask},on:{input:function(e){e.target.composing||(t.newTask=e.target.value)}}}),e("button",{on:{click:t.addTask}},[t._v("Добавить")])]),e("ul",t._l(t.tasks,(function(s,a){return e("li",{key:a},[s.editing?e("div",{staticClass:"task"},[e("input",{directives:[{name:"model",rawName:"v-model",value:s.title,expression:"task.title"}],attrs:{type:"text"},domProps:{value:s.title},on:{input:function(e){e.target.composing||t.$set(s,"title",e.target.value)}}}),e("button",{on:{click:function(e){return t.saveTask(s)}}},[t._v("Сохранить")])]):e("div",{staticClass:"task"},[t._v(" "+t._s(s.title)+" "),e("div",{staticClass:"buttons"},[e("button",{on:{click:function(e){return t.editTask(s)}}},[t._v("Изменить")]),e("button",{on:{click:function(e){return t.deleteTask(a)}}},[t._v("Удалить")])])])])})),0)])},h=[],g=s(629),w={name:"TaskListPage",data(){return{newTask:""}},computed:{...(0,g.Se)(["getTasks"]),tasks(){return this.getTasks}},methods:{...(0,g.nv)(["createTask","editTask","removeTask"]),addTask(){""!==this.newTask.trim()&&(this.createTask({title:this.newTask,editing:!1}),this.newTask="",this.saveTasksToLocalStorage())},editTask(t){t.editing=!0},saveTask(t){""!==t.title.trim()&&(t.editing=!1,this.editTask({index:t.index,task:{...t}}),this.saveTasksToLocalStorage())},deleteTask(t){this.removeTask(t),this.saveTasksToLocalStorage()},saveTasksToLocalStorage(){localStorage.setItem("tasks",JSON.stringify(this.tasks))},loadTasksFromLocalStorage(){const t=localStorage.getItem("tasks");t&&this.$store.commit("setTasks",JSON.parse(t))}},mounted(){this.loadTasksFromLocalStorage()}},b=w,_=(0,r.Z)(b,p,h,!1,null,null,null),x=_.exports;a.ZP.use(c.ZP);const P=[{path:"/",name:"Home",component:m},{path:"/tasks",name:"TaskList",component:x}],O=new c.ZP({routes:P});var y=O;s(7658);a.ZP.use(g.ZP);var S=new g.ZP.Store({state:{tasks:[]},mutations:{setTasks(t,e){t.tasks=e},addTask(t,e){t.tasks.push(e)},updateTask(t,{index:e,task:s}){a.ZP.set(t.tasks,e,s)},deleteTask(t,e){t.tasks.splice(e,1)}},actions:{createTask({commit:t},e){t("addTask",e)},editTask({commit:t},{index:e,task:s}){t("updateTask",{index:e,task:s})},removeTask({commit:t},e){t("deleteTask",e)}},getters:{getTasks(t){return t.tasks}}});a.ZP.config.productionTip=!1,new a.ZP({router:y,store:S,render:t=>t(l)}).$mount("#app")}},e={};function s(a){var n=e[a];if(void 0!==n)return n.exports;var o=e[a]={exports:{}};return t[a].call(o.exports,o,o.exports,s),o.exports}s.m=t,function(){var t=[];s.O=function(e,a,n,o){if(!a){var r=1/0;for(c=0;c<t.length;c++){a=t[c][0],n=t[c][1],o=t[c][2];for(var i=!0,u=0;u<a.length;u++)(!1&o||r>=o)&&Object.keys(s.O).every((function(t){return s.O[t](a[u])}))?a.splice(u--,1):(i=!1,o<r&&(r=o));if(i){t.splice(c--,1);var l=n();void 0!==l&&(e=l)}}return e}o=o||0;for(var c=t.length;c>0&&t[c-1][2]>o;c--)t[c]=t[c-1];t[c]=[a,n,o]}}(),function(){s.d=function(t,e){for(var a in e)s.o(e,a)&&!s.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,a){var n,o,r=a[0],i=a[1],u=a[2],l=0;if(r.some((function(e){return 0!==t[e]}))){for(n in i)s.o(i,n)&&(s.m[n]=i[n]);if(u)var c=u(s)}for(e&&e(a);l<r.length;l++)o=r[l],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(c)},a=self["webpackChunktask_manager"]=self["webpackChunktask_manager"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(5502)}));a=s.O(a)})();
//# sourceMappingURL=app.72aaf4f2.js.map