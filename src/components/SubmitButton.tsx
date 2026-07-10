"use client";

type SubmitButtonProps = {
    label: string,
    message: string
}

export function SubmitButton({label, message}:SubmitButtonProps) {
    return (
        <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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