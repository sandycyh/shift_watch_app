import React from 'react'; 

export default function Spacer({ size, horizontal = false}) {
    return (
        <div 
            style={{ 
                width: horizontal ? size : '1px', 
                height: horizontal ? '1px' : size, 
                display: horizontal ? 'inline-block' : 'block', 
                flexShrink: 0, 
        }}/>
    )
}