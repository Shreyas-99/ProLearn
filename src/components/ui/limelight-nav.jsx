// limelight-nav.jsx
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,           // ✅ add this
  cloneElement
} from 'react';
import Link from "next/link";

// ...icons...

export const LimelightNav = ({
  items,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef([]);
  const limelightRef = useRef(null);

  // ✅ keep internal state in sync with prop (URL-based index)
  useEffect(() => {
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex]);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];

    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;

      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index, itemOnClick) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  // limelight-nav.jsx (only styling changes shown)

return (
  <nav
    className={`
      relative inline-flex items-center h-13 rounded-2xl
      bg-zinc-900/80 text-zinc-100 border border-zinc-800
      px-2
      ${className}
    `}
  >
    {items.map(({ id, icon, label, onClick }, index) => (
      <Link
        href={label}
        key={id}
        ref={el => (navItemRefs.current[index] = el)}
        className={`
          relative z-20 flex h-full cursor-pointer items-center justify-center
          px-4 py-3
          ${iconContainerClassName}
        `}
        onClick={() => handleItemClick(index, onClick)}
        aria-label={label}
      >
        {cloneElement(icon, {
          className: `
            w-5 h-5 transition-opacity duration-150 ease-in-out
            ${activeIndex === index ? 'opacity-100' : 'opacity-40'}
            ${icon.props.className || ''} ${iconClassName || ''}
          `,
        })}
      </Link>
    ))}

    {/* Limelight bar */}
    <div
      ref={limelightRef}
      className={`
        absolute top-0 z-10 w-11 h-[4px] rounded-full
        bg-white
        shadow-[0_26px_40px_rgba(255,255,255,0.45)]
        ${isReady ? 'transition-[left] duration-300 ease-out' : ''}
        ${limelightClassName}
      `}
      style={{ left: '-999px' }}
    >
      {/* Spotlight cone */}
      <div
        className="
          absolute left-[-30%] top-[4px] w-[160%] h-16
          [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)]
          bg-gradient-to-b from-white/35 to-transparent
          pointer-events-none
        "
      />
    </div>
  </nav>
);

};
