

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useEffect, useId, useState } from "react";

export default function DarkThemeToggle({className}:React.HTMLAttributes<HTMLDivElement>) {
  const id = useId();
  const [checked, setChecked] = useState<boolean>(true);

  useEffect(() => {
    if (checked) {
      document.documentElement.classList.add('dark'); // Add dark theme class
    } else {
      document.documentElement.classList.remove('dark'); // Remove dark theme class
    }
  }, [checked]);
  
  return (
    <div className={className}>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={setChecked}
          className="peer absolute inset-0 h-[inherit] w-auto data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
        />
        <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
          <Moon size={16} strokeWidth={2} aria-hidden="true" className="text-black" />
        </span>
        <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full">
          <Sun size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Labeled switch
      </Label>
    </div>
  );
}
