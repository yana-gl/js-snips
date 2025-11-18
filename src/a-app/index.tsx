import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './providers/router';
import { ThemeProvider } from '@mui/material';
import { muiTheme } from './providers/muiTheme';
import { DragDropProvider } from '../f-shared/context/dragDropContext';

// консоль для мобилки 
// if (import.meta.env.DEV) {
//   import('eruda').then((eruda) => {
//     eruda.default.init();
//   });
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={muiTheme}>
			<DragDropProvider>
				<AppRouter/>
			</DragDropProvider>
		</ThemeProvider>
	</React.StrictMode>
);
