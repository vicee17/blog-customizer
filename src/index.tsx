import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useRef, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	const [ articleState, setArticleState ] = useState(defaultArticleState);

	const applyState = (newState: ArticleStateType) => {
		setArticleState(newState);

		document.documentElement.style.setProperty('--font-family', newState.fontFamilyOption.value);
    	document.documentElement.style.setProperty('--font-size', newState.fontSizeOption.value);
    	document.documentElement.style.setProperty('--font-color', newState.fontColor.value);
   		document.documentElement.style.setProperty('--bg-color', newState.backgroundColor.value);
    	document.documentElement.style.setProperty('--container-width', newState.contentWidth.value);
  	};

	return (
		<main className={clsx(styles.main)}>
			<ArticleParamsForm 
				currentArticleState={articleState}
				onApplyState={applyState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);