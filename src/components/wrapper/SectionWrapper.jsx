import { cn } from "../../lib/utils";

export default function SectionWrapper({ children,
      className,
}) {
      return <section className={cn(
            "pt-7 md:pt-10 ", className
      )}>
            {children}
      </section>
}