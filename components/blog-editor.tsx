'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Bold, Italic, List, ListOrdered, Heading2, Link2, Unlink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BlogEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
  editable?: boolean
}

export function BlogEditor({
  content = '',
  onChange,
  placeholder = 'Start writing...',
  className,
  editable = true,
}: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline underline-offset-2',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: content || '',
    editable,
    editorProps: {
      attributes: {
        class:
          'min-h-[200px] px-3 py-2 focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-medium [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-2 [&_a]:text-primary [&_a]:underline',
      },
      handleDOMEvents: {
        blur: () => {
          if (onChange && editor) {
            onChange(editor.getHTML())
          }
        },
      },
    },
  })

  const handleChange = useCallback(() => {
    if (onChange && editor) {
      onChange(editor.getHTML())
    }
  }, [onChange, editor])

  useEffect(() => {
    if (!editor) return
    editor.on('update', handleChange)
    return () => {
      editor.off('update', handleChange)
    }
  }, [editor, handleChange])

  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content, editor])

  if (!editor) {
    return (
      <div
        className={cn(
          'min-h-[200px] rounded-md border border-input bg-background px-3 py-2',
          className
        )}
      >
        <p className="text-sm text-muted-foreground">{placeholder}</p>
      </div>
    )
  }

  return (
    <div className={cn('rounded-md border border-input bg-background', className)}>
      <EditorContent editor={editor} />
      {editable && (
        <BubbleMenu
          editor={editor}
          className="flex items-center gap-0.5 rounded-md border border-border bg-background p-1 shadow-lg"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(editor.isActive('bold') && 'bg-accent')}
            aria-label="Bold"
          >
            <Bold className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(editor.isActive('italic') && 'bg-accent')}
            aria-label="Italic"
          >
            <Italic className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(editor.isActive('heading', { level: 2 }) && 'bg-accent')}
            aria-label="Heading 2"
          >
            <Heading2 className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(editor.isActive('bulletList') && 'bg-accent')}
            aria-label="Bullet list"
          >
            <List className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(editor.isActive('orderedList') && 'bg-accent')}
            aria-label="Numbered list"
          >
            <ListOrdered className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => {
              const url = window.prompt('URL')
              if (url) {
                editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
              }
            }}
            className={cn(editor.isActive('link') && 'bg-accent')}
            aria-label="Add link"
          >
            <Link2 className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
            aria-label="Remove link"
          >
            <Unlink className="size-3.5" />
          </Button>
        </BubbleMenu>
      )}
    </div>
  )
}
