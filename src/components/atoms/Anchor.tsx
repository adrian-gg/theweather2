import React from 'react';
import classNames from '../../utils/classNames';

interface AnchorProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  onClick?: () => void;
}

function Anchor({
  href = '#',
  className = '',
  children,
  target = '_self',
  rel,
  onClick = () => {},
}: AnchorProps) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <a
      href={href}
      className={classNames('anchor', className)}
      onClick={handleClick}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}

export default Anchor;
