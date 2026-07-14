"use client";

import {useState} from "react";

type TitleInputProps = {
    // ?는 선택적 prop 표시, 전달 안 해도 타입 에러 없음
    defaultValue?: string
}

// defaultValue 미전달 시 빈 문자열로 대체
export function TitleInput({defaultValue = ""}: TitleInputProps) {
    // useState로 글자 수 상태 생성, length는 현재값 조회용, setLength는 갱신용 함수
    const [length, setLength] = useState(defaultValue.length);

    return (
        <div>
            <input
                type="text"
                name="title"
                placeholder="제목"
                defaultValue={defaultValue}
                required
                maxLength={20}
                // 입력마다 길이 상태 갱신, 이 호출이 리렌더링 트리거
                onChange={(e) => setLength(e.target.value.length)}
                className="w-full border rounded px-3 py-2"
            />
            <p className="text-sm text-gray-400 text-right">{length}/20자</p>
        </div>
    )
}