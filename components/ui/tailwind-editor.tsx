"use client";

import { useState } from "react";
import { Button } from "./button";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface TailwindEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TailwindEditor({ content, onChange }: TailwindEditorProps) {
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const handleSelect = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
      const range = selection.getRangeAt(0);
      setSelectionStart(range.startOffset);
      setSelectionEnd(range.endOffset);
    }
  };

  const applyStyle = (style: string) => {
    if (!selectedText) return;

    const before = content.substring(0, selectionStart);
    const after = content.substring(selectionEnd);

    // Create a wrapper element with Tailwind classes
    const formattedText = `<p class="${style}">${selectedText}</p>`;

    const newContent = before + formattedText + after;
    onChange(newContent);
  };

  const createList = (type: "ordered" | "unordered") => {
    if (!selectedText) return;

    const items = selectedText.split("\n").filter((item) => item.trim());
    const listClass = type === "ordered" ? "list-decimal" : "list-disc";
    const list = `<ul class="${listClass} pl-6 space-y-2 mb-4">
      ${items.map((item) => `<li class="pl-2">${item}</li>`).join("\n")}
    </ul>`;

    const before = content.substring(0, selectionStart);
    const after = content.substring(selectionEnd);
    const newContent = before + list + after;
    onChange(newContent);
  };

  const setAlignment = (alignment: string) => {
    if (!selectedText) return;

    const before = content.substring(0, selectionStart);
    const after = content.substring(selectionEnd);
    const alignedText = `<div class="text-${alignment}">${selectedText}</div>`;
    const newContent = before + alignedText + after;
    onChange(newContent);
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-wrap gap-2 mb-4 border-b pb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => applyStyle("font-bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => applyStyle("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => applyStyle("text-4xl font-bold mb-6")}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => applyStyle("text-3xl font-semibold mb-4")}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => applyStyle("text-2xl font-medium mb-3")}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => createList("unordered")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => createList("ordered")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            applyStyle("border-l-4 border-primary pl-4 italic my-4")
          }
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setAlignment("left")}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setAlignment("center")}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setAlignment("right")}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <div
        contentEditable
        className="min-h-[200px] focus:outline-none prose prose-neutral dark:prose-invert max-w-none"
        onSelect={handleSelect}
        dangerouslySetInnerHTML={{ __html: content }}
        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
}
