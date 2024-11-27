import { RefObject, useEffect, useRef, useState } from 'react';

const useDetectClose = (
  initialState: boolean
): [boolean, RefObject<HTMLDivElement>, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState); // 드롭다운의 열림/닫힘 상태를 관리
  const ref = useRef<HTMLDivElement>(null); // 드롭다운 컴포넌트를 참조하기 위한 ref

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // 현재 상태의 반대로 상태를 변경
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // ref.current가 존재하고, 클릭된 요소가 드롭다운 내부 요소가 아닐 경우
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false); // 드롭다운을 닫음
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside); // 드롭다운이 열릴 때만 외부 클릭 감지를 활성화
    }

    return () => {
      window.removeEventListener('click', handleClickOutside); // 컴포넌트 언마운트 혹은 isOpen 변화 시 이벤트 리스너 제거
    };
  }, [isOpen]); // isOpen이 변할 때만 이 effect를 실행

  return [isOpen, ref, toggleDropdown];
};

export default useDetectClose;
