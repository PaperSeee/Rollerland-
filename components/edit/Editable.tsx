"use client";

import { useEdit } from "./EditProvider";

// Inline-editable text. In normal mode renders `value`. In edit mode (admin +
// ?edit=1) becomes click-to-edit (contentEditable); edits buffer in the context
// under `field` (the SiteContent key). Always edits the English source.
export default function Editable({
  field,
  value,
  as = "span",
  className,
  style,
  multiline = false,
}: {
  field: string;
  value: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}) {
  const { editing, setField, getField } = useEdit();
  const current = getField(field, value);
  const Tag = as as keyof JSX.IntrinsicElements;

  if (!editing) {
    return (
      <Tag className={className} style={style}>
        {current}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={{ ...style, outline: "1px dashed rgba(155,146,240,0.6)", outlineOffset: 3, cursor: "text", borderRadius: 2 }}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const text = multiline
          ? (e.currentTarget as HTMLElement).innerText
          : (e.currentTarget as HTMLElement).innerText.replace(/\n/g, " ").trim();
        if (text !== current) setField(field, text);
      }}
      title="Click to edit"
    >
      {current}
    </Tag>
  );
}
