// src/components/ui/GradientHighlight.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * GradientHighlight (ShadCN-style component)
 *
 * Usage:
 *   <GradientHighlight>Commerce</GradientHighlight>
 *   <GradientHighlight direction="reverse">Commerce</GradientHighlight>
 *
 * Props:
 *   - children: ReactNode (required)
 *   - className: string (optional, merged)
 *   - direction: 'normal' | 'reverse' (optional, default 'normal')
 *   - ...spanProps: any other span props
 *
 * Consistent PayPal blue gradient: dark → main → light (normal), or light → main → dark (reverse)
 */
export interface GradientHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  direction?: 'normal' | 'reverse';
}

export const GradientHighlight = React.forwardRef<HTMLSpanElement, GradientHighlightProps>(
  ({ children, className, direction = 'normal', ...props }, ref) => {
    const gradientClass =
      direction === 'reverse'
            ? 'bg-gradient-to-l from-[#0070E0] to-[#6CC3FF]'
            : 'bg-gradient-to-l from-[#6CC3FF] to-[#0070E0]';
    return (
      <span
        ref={ref}
        className={cn(
          gradientClass,
          'bg-clip-text text-transparent',
          className
        )}
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
);
GradientHighlight.displayName = 'GradientHighlight'; 