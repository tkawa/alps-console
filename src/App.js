import React from 'react';
import ConsoleApp from './ConsoleApp';

// export default {
// 	ALL_TODOS: 'all',
// 	ACTIVE_TODOS: 'active',
// 	COMPLETED_TODOS: 'completed',
// 	ENTER_KEY: 13,
// 	ESCAPE_KEY: 27
// };

// var model = new TodoModel('react-todos');
var render = () => {
	React.render(
		<ConsoleApp />,
		document.getElementById('TodoApp')
	);
}
// model.subscribe(render);
render();
