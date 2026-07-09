"use client"; // 이벤트 핸들러(onClick)를 쓰려면 클라이언트 컴포넌트여야 함

export function DeleteButton() {
    return (
        <button
            type="submit"
            onClick={(e) => {
                if (!confirm("정말 삭제하시겠어요?")) {
                    e.preventDefault();
                }
            }}
        >삭제</button>
    );
}