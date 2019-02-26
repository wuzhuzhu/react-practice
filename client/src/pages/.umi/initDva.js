import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});
app.use(require('/Users/wutong/WebstormProjects/react-practice/client/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'count', ...(require('/Users/wutong/WebstormProjects/react-practice/client/src/models/count.js').default) });
app.model({ namespace: 'posts', ...(require('/Users/wutong/WebstormProjects/react-practice/client/src/models/posts.js').default) });
