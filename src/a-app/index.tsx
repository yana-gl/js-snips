import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from './providers/store';
import { AppRouter } from './providers/router';
import { ThemeProvider } from '@mui/material';
import { muiTheme } from './providers/muiTheme';

// if (import.meta.env.DEV) {
//   import('eruda').then((eruda) => {
//     eruda.default.init();
//   });
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={muiTheme}>
			<StoreProvider>
				<AppRouter/>
			</StoreProvider>
		</ThemeProvider>
	</React.StrictMode>
);
