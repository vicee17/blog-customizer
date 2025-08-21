import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState, useRef, useEffect } from 'react';
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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	isFixedOpen?: boolean,
	isFixedClose?: boolean,
	currentArticleState: ArticleStateType,
	onApplyState: (newState: ArticleStateType) => void
}

export const ArticleParamsForm = ({
	isFixedOpen = false,
	isFixedClose = false,
	currentArticleState,
	onApplyState
}: ArticleParamsFormProps) => {

	const sidebarRef = useRef<HTMLDivElement>(null);
	const [ isOpen, setIsOpen ] = useState(false);

	const [formState, setFormState] = useState({
    fontFamilyOption: currentArticleState.fontFamilyOption,
    fontSizeOption: currentArticleState.fontSizeOption,
    fontColor: currentArticleState.fontColor,
    backgroundColor: currentArticleState.backgroundColor,
    contentWidth: currentArticleState.contentWidth
  });

  useEffect(() => {
    setFormState({
      fontFamilyOption: currentArticleState.fontFamilyOption,
      fontSizeOption: currentArticleState.fontSizeOption,
      fontColor: currentArticleState.fontColor,
      backgroundColor: currentArticleState.backgroundColor,
      contentWidth: currentArticleState.contentWidth
    });
  }, [currentArticleState]);

	const isPanelOpen = isFixedOpen ? true : isFixedClose ? false : isOpen;

	useOutsideClickClose({
    	isOpen: isPanelOpen && !isFixedOpen, 
    	rootRef: sidebarRef, 
    	onChange: setIsOpen, 
  	});

	const handleTogglePanel = () => {
		if (!isFixedOpen && !isFixedClose) {
			setIsOpen(!isOpen);
		}
	}

	const handlerReset = () => {
    	const resetState = {
      		fontFamilyOption: defaultArticleState.fontFamilyOption,
      		fontSizeOption: defaultArticleState.fontSizeOption,
      		fontColor: defaultArticleState.fontColor,
      		backgroundColor: defaultArticleState.backgroundColor,
     		contentWidth: defaultArticleState.contentWidth
    	};
    
    	setFormState(resetState);
    	onApplyState({
      	...defaultArticleState,
      	fontFamilyOption: defaultArticleState.fontFamilyOption,
      	fontSizeOption: defaultArticleState.fontSizeOption
    	});
  	}

	const handlerSubmit = (event: React.FormEvent) => {
    	event.preventDefault();

    	onApplyState({
      		...currentArticleState,
      		fontFamilyOption: formState.fontFamilyOption,
      		fontSizeOption: formState.fontSizeOption,
      		fontColor: formState.fontColor,
      		backgroundColor: formState.backgroundColor,
      		contentWidth: formState.contentWidth
    	});
  	}
 
	return (
		<>
			<ArrowButton isOpen={isPanelOpen} onClick={handleTogglePanel} />
			<aside className={clsx(styles.container, {[styles.container_open]: isPanelOpen})} ref={sidebarRef}>
				<form className={styles.form} onSubmit={handlerSubmit}>
					<h1 className={styles.container_title}>задайте параметры</h1>
					<Select 
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => setFormState(prev => ({
							...prev,
							fontFamilyOption: option
						}))}
					/>
					<RadioGroup 
						name='fontSize'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => setFormState(prev => ({
							...prev,
							fontSizeOption: option
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