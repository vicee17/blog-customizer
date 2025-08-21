import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
  	fontColors,
  	backgroundColors,
  	contentWidthArr,
  	defaultArticleState,
  	ArticleStateType
} from '../../constants/articleProps'

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	isFixedOpen?: boolean,
	isFixedClose?: boolean
	mainRef: React.RefObject<HTMLElement>
}

export const ArticleParamsForm = ({
	isFixedOpen = false,
	isFixedClose = false,
	mainRef
}: ArticleParamsFormProps) => {

	const [ isOpen, setIsOpen ] = useState(false);

	const [ formState, setFormState ] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth
	})

	const isPanelOpen = isFixedOpen ? true : isFixedClose ? false : isOpen;

	const handleTogglePanel = () => {
		if (!isFixedOpen && !isFixedClose) {
			setIsOpen(!isOpen);
		}
	}

	const applyStyles = (state: typeof formState) => {
		if (mainRef.current) {
			const main = mainRef.current;

			main.style.setProperty('--font-family', state.fontFamily.value);
			main.style.setProperty('--font-size', state.fontSize.value);
			main.style.setProperty('--font-color', state.fontColor.value);
			main.style.setProperty('--bg-color', state.backgroundColor.value);
			main.style.setProperty('--container-width', state.contentWidth.value);
		}
	}

	const handlerReset = () => {
		const defaultState = {
      		fontFamily: defaultArticleState.fontFamilyOption,
      		fontSize: defaultArticleState.fontSizeOption,
      		fontColor: defaultArticleState.fontColor,
      		backgroundColor: defaultArticleState.backgroundColor,
      		contentWidth: defaultArticleState.contentWidth,
    	};

		setFormState(defaultState);
		applyStyles(defaultState);
	}

	const handlerSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		applyStyles(formState);
		
		console.log('Применены стили:', {
      		fontFamily: formState.fontFamily,
      		fontSize: formState.fontSize,
      		fontColor: formState.fontColor,
      		backgroundColor: formState.backgroundColor,
      		contentWidth: formState.contentWidth,
    	});
	}
 
	return (
		<>
			<ArrowButton isOpen={isPanelOpen} onClick={handleTogglePanel} />
			<aside className={clsx(styles.container, {[styles.container_open]: isPanelOpen})}>
				<form className={styles.form} onSubmit={handlerSubmit}>
					<Select 
						title='шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(option) => setFormState(prev => ({
							...prev,
							fontFamily: option
						}))}
					/>
					<RadioGroup 
						name='fontSize'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSize}
						onChange={(option) => setFormState(prev => ({
							...prev,
							fontSize: option
						}))}
					/>
					<Select 
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) => setFormState(prev => ({
							...prev,
							fontColor: option
						}))}
					/>
					<div></div>
					<Select 
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => setFormState(prev => ({
							...prev,
							backgroundColor: option
						}))}
					/>
					<Select 
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => setFormState(prev => ({
							...prev,
							contentWidth: option
						}))}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handlerReset}/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
