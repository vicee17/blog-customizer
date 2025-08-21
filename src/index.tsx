import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const mainRef = useRef<HTMLElement>(null)

	return (
		<main
			className={clsx(styles.main)}
			ref={mainRef}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm mainRef={mainRef}/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
