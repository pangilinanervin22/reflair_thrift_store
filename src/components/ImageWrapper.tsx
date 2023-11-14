import React from 'react'

export default function ImageWrapper({ children, styleName }: { children: React.ReactNode, styleName: string }) {
    return (
        <div className={styleName}>{children}</div>
    )
}
