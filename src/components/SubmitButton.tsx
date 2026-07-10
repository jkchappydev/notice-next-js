type SubmitButtonProps = {
    label: string
}

export function SubmitButton({label}:SubmitButtonProps) {
    return (
        <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            {label}
        </button>
    );
}