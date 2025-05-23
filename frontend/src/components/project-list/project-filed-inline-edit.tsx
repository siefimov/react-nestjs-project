import React from 'react';
import styles from './project-filed-inline-edit.module.scss';

type Props = {
  value: string | null | undefined;
  isEditing: boolean;
  onStartEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  ariaLabel: string;
  placeholder?: string;
};

export const ProjectFieldInlineEdit: React.FC<Props> = ({
  value,
  isEditing,
  onStartEdit,
  onChange,
  onBlur,
  onKeyDown,
  ariaLabel,
  placeholder,
}) =>
  isEditing ? (
    <input
      type="text"
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus
      aria-label={ariaLabel}
      placeholder={placeholder}
      className={styles['project-field-inline-edit__input']}
    />
  ) : (
    <span
      onDoubleClick={onStartEdit}
      role="button"
      aria-label={ariaLabel}
      className={styles['project-field-inline-edit']}
    >
      {value?.trim() ? (
        value
      ) : (
        <i className={styles['project-field-inline-edit__placeholder']}>
          {placeholder ?? 'add value...'}
        </i>
      )}
    </span>
  );
