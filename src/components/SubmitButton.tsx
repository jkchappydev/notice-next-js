"use client";

type SubmitButtonProps = {
    label: string,
    message: string
}

export function SubmitButton({label, message}:SubmitButtonProps) {
    return (
        <button
            type="submit"
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={(e) => {
                if (!confirm(message)) {
                    e.preventDefault();
                }
            }}
        >
            {label}
        </button>
    );
}