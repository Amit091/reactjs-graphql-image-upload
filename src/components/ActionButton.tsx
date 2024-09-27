import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>; // Accepts a React component for the icon
  className?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  icon: Icon,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 text-white rounded-md ${className}`}
      disabled={disabled}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </button>
  );
};

export default ActionButton;
