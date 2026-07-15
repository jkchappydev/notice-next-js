type SearchButtonProps = {
    label: string
}

export function SearchButton({label}: SearchButtonProps) {
    return (
        <button
            type="submit"
            className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-50"
        >{label}</button>
    );
}