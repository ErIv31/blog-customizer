import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { FormEvent, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	state: ArticleStateType;
	onChange: (state: ArticleStateType) => void;
};

const useScrollBarHidden = (isOpen: boolean) => {
	useEffect(() => {
		const scrollBarSize =
			window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = isOpen ? 'hidden' : '';
		document.body.style['paddingRight'] = isOpen ? `${scrollBarSize}px` : '';

		return () => {
			document.body.style.overflow = '';
			document.body.style['paddingRight'] = '';
		};
	}, [isOpen]);
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { state, onChange } = props;

	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] = useState(state);

	const rootRef = useRef<HTMLDivElement>(null);

	const handleClickArrow = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		onChange(articleState);
	};
	const handleFormReset = () => {
		setArticleState(defaultArticleState);
		onChange(defaultArticleState);
	};

	const handleFontFamilyChange = (fontFamily: OptionType) => {
		setArticleState({ ...articleState, fontFamilyOption: fontFamily });
	};
	const handleFontSizeChange = (fontSize: OptionType) => {
		setArticleState({ ...articleState, fontSizeOption: fontSize });
	};
	const handleFontColorChange = (fontColor: OptionType) => {
		setArticleState({ ...articleState, fontColor: fontColor });
	};
	const handleBackgroundColorChange = (backgroundColor: OptionType) => {
		setArticleState({ ...articleState, backgroundColor: backgroundColor });
	};
	const handleContentWidthChange = (contentWidth: OptionType) => {
		setArticleState({ ...articleState, contentWidth: contentWidth });
	};

	useOutsideClickClose({ isOpen, rootRef, onChange: setIsOpen });
	useScrollBarHidden(isOpen);

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={handleClickArrow} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={articleState.fontFamilyOption}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={articleState.fontColor}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={articleState.backgroundColor}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={articleState.contentWidth}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
