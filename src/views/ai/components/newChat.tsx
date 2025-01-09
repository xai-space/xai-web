'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

import { useChat } from '@/hooks/use-chat'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const formSchema = z.object({
  message: z.string().min(1, {
    message: 'Message is required to start a chat.',
  }),
})

export function NewChatForm() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const chatMutation = useChat()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const input = {
        agent_id: '001f6b5d-1249-4abe-a6a8-003d4a037dcf',
        message: values.message,
        session_id: null,
        stream: false,
      }

      const content = await chatMutation.mutateAsync(input)
      if (content?.data?.content) {
        router.push(`/ai/chat/${content.data.session_id}`)
      }
    } catch (err) {
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-2"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t('ai.start_chat_input_placeholder')}
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            t('ai.starting_chat')
          ) : (
            <>
              {t('ai.start_chat')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
