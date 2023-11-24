
import React, { useState } from 'react';

type DropdownProps = {
    trigger: React.ReactNode;
    content: React.ReactNode;
};

export default function DropDownHover({ trigger, content }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative' }}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div>{trigger}</div>
            {isOpen &&
                <div style={{ position: "absolute", right: "32px", top: "16px" }}>{content}</div>}
        </div>
    );
};

