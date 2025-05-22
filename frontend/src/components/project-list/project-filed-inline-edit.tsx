import React from 'react';

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
    />
  ) : (
    <span
      onDoubleClick={onStartEdit}
      role="button"
      aria-label={ariaLabel}
      style={{
        minHeight: 20,
        display: 'inline-block',
        minWidth: 40,
        cursor: 'pointer',
      }}
    >
      {value?.trim() ? (
        value
      ) : (
        <i style={{ color: '#aaa' }}>{placeholder ?? 'add value...'}</i>
      )}
    </span>
  );
