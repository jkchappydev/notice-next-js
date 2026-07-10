"use client"; // 이벤트 핸들러(onClick)를 쓰려면 클라이언트 컴포넌트여야 함

type DeleteButtonProps = {
    label: string,
    message: string
}

export function DeleteButton({label, message}: DeleteButtonProps) {
    return (
        <button
            type="submit"
            className="text-red-600 hover:underline cursor-pointer"
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