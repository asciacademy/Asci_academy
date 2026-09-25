import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none select-none transition-colors overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-primary/20 bg-primary/10 text-primary [a&]:hover:bg-primary/20',
        solid:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-[#EA5300]',
        secondary:
          'border-border/80 bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800/40 dark:bg-rose-950/40 dark:text-rose-400',
        outline:
          'text-foreground border-border bg-card [a&]:hover:bg-secondary',
        success:
          'border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-400',
        warning:
          'border-amber-200 bg-amber-50 text-amber-700 font-semibold dark:border-amber-800/40 dark:bg-amber-950/40 dark:text-amber-400',
        urgency:
          'border-rose-200 bg-rose-50 text-rose-700 font-semibold dark:border-rose-800/40 dark:bg-rose-950/40 dark:text-rose-400',
        category:
          'border border-border/80 bg-secondary/80 text-foreground font-medium',
        info:
          'border-sky-200 bg-sky-50 text-sky-700 font-medium dark:border-sky-800/40 dark:bg-sky-950/40 dark:text-sky-400',
      },
      size: {
        default: 'px-2 py-0.5 text-xs',
        sm: 'px-1.5 py-0.25 text-[11px] rounded',
        pill: 'px-2.5 py-0.5 text-[11px] rounded-full',
        'pill-sm': 'px-2 py-0.2 text-[10px] rounded-full font-semibold uppercase tracking-wider',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
