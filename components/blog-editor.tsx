'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  Link2,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ImagePlus,
} from 'lucide-react'
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
  const imageInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
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
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content: content || '',
    editable,
    editorProps: {
      attributes: {
        class:
          'min-h-[200px] px-3 py-2 focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-medium [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-2 [&_a]:text-primary [&_a]:underline [&_u]:underline',
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

  const handleInsertImage = useCallback(() => {
    imageInputRef.current?.click()
  }, [])

  const handleImageFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || !editor) return
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        editor.chain().focus().setImage({ src: base64 }).run()
      }
      reader.readAsDataURL(file)
      e.target.value = ''
    },
    [editor]
  )

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
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFileChange}
      />
      {editable && (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(editor.isActive('bold') && 'bg-accent')}
            aria-label="加粗"
            title="加粗"
          >
            <Bold className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(editor.isActive('italic') && 'bg-accent')}
            aria-label="倾斜"
            title="倾斜"
          >
            <Italic className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(editor.isActive('underline') && 'bg-accent')}
            aria-label="下划线"
            title="下划线"
          >
            <UnderlineIcon className="size-3.5" />
          </Button>
          <span className="mx-1 h-4 w-px bg-border" />
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={cn(editor.isActive({ textAlign: 'left' }) && 'bg-accent')}
            aria-label="左对齐"
            title="左对齐"
          >
            <AlignLeft className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={cn(editor.isActive({ textAlign: 'center' }) && 'bg-accent')}
            aria-label="居中"
            title="居中"
          >
            <AlignCenter className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={cn(editor.isActive({ textAlign: 'right' }) && 'bg-accent')}
            aria-label="右对齐"
            title="右对齐"
          >
            <AlignRight className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={cn(editor.isActive({ textAlign: 'justify' }) && 'bg-accent')}
            aria-label="两端对齐"
            title="两端对齐"
          >
            <AlignJustify className="size-3.5" />
          </Button>
          <span className="mx-1 h-4 w-px bg-border" />
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={handleInsertImage}
            aria-label="插入图片"
            title="插入本地图片"
          >
            <ImagePlus className="size-3.5" />
          </Button>
        </div>
      )}
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
            aria-label="加粗"
          >
            <Bold className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(editor.isActive('italic') && 'bg-accent')}
            aria-label="倾斜"
          >
            <Italic className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(editor.isActive('underline') && 'bg-accent')}
            aria-label="下划线"
          >
            <UnderlineIcon className="size-3.5" />
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
