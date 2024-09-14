interface AccordionProps {
  name?: string;
  label: React.ReactNode;
  isOpen: boolean;
  children: React.ReactNode;
}

function Accordion({
  name = 'accordion',
  label,
  isOpen,
  children,
}: AccordionProps) {
  return (
    <details name={name} className="accordion" open={isOpen}>
      <summary className="accordion__head">
        <span>{label}</span>
      </summary>

      <div className="accordion__body">{children}</div>
    </details>
  );
}

export default Accordion;
