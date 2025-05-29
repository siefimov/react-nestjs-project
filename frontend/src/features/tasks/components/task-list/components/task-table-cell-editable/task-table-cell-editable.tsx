import React from 'react';

type Props = {
  value: string;
  editing: boolean;
  onDoubleClick: () => void;
  editValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurOrEnter: (value: string) => void;
  onEscape: () => void;
  placeholder?: string;
};

export const TaskTableCellEditable: React.FC<Props> = ({
  value,
  editing,
  onDoubleClick,
  editValue,
  onChange,
  onBlurOrEnter,
  onEscape,
  placeholder,
}) => (
  <td onDoubleClick={onDoubleClick}>
    {editing ? (
      <input
        value={editValue}
        autoFocus
        onChange={onChange}
        onBlur={() => onBlurOrEnter(editValue)}
        onKeyDown={e => {
          if (e.key === 'Enter') onBlurOrEnter(editValue);
          if (e.key === 'Escape') onEscape();
        }}
      />
    ) : value ? (
      value
    ) : (
      <span
        style={{
          color: '#a1a7bb',
          fontSize: '12px',
          fontStyle: 'italic',
        }}
      >
        {placeholder}
      </span>
    )}
  </td>
);
