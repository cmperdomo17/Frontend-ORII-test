"use client";

import { forwardRef } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/form/input";
import { Label } from "@/components/ui/typography/label";
import { PasswordInput } from "@/components/ui/form/password-input";
import { EmailInput } from "./email-input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/navigation/tooltip";

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
    type?: "text" | "password" | "email";
    tooltipText?: string;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
    ({ label, id, placeholder, required = false, type = "text", tooltipText, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Label htmlFor={id} required={required}>{label}</Label>
                    {tooltipText && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tooltipText}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
                {type === "password" ? (
                    <PasswordInput id={id} placeholder={placeholder} ref={ref} {...props} />
                ) : type === "email" ? (
                    <EmailInput id={id} placeholder={placeholder} ref={ref} {...props} />
                ) : (
                    <Input id={id} placeholder={placeholder} ref={ref} {...props} />
                )}
            </div>
        );
    }
);

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;