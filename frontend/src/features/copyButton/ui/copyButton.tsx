import c from './copyButton.module.scss';
import type { ComponentPropsWithoutRef } from 'react';
import copy from 'shared/icons/icon-copy.svg?url';
import { useTranslation } from 'react-i18next';
import { copyClickHandler } from '../model/copyClickHandler';

interface CopyButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** The string to be written to the clipboard when the button is clicked. */
  text: string;
  className?: string;
}

/** Icon button that writes `text` to the clipboard when clicked. */
export const CopyButton = ({ text, className = '', ...props }: CopyButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => copyClickHandler(text)}
      aria-label={t('ariaLabel.copy')}
      className={`${c.copy} ${className}`}
      {...props}
    >
      <img
        decoding="async"
        width="18"
        height="21"
        src={copy}
        alt={t('copyAlt')}
        className={c.img}
      />
    </button>
  );
};
