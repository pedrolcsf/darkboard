import { NodeResizer } from "@reactflow/node-resizer";
import { NodeProps, Handle, Position } from "reactflow";
import '@reactflow/node-resizer/dist/style.css'

export function Triangle({ selected }: NodeProps) {
    return (
        <div style={{
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 45px 90px 45px',
            borderColor: 'transparent transparent #007bff transparent',
        }} className="w-full h-full ">
            <NodeResizer
                minWidth={200}
                minHeight={200}
                isVisible={selected}
                lineClassName="border-blue-400"
                handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
            />
            <Handle
                id="right"
                type="source"
                position={Position.Right}
                className="-right-8 w-4 h-4 border-2 bg-blue-400/80"
            />
            <Handle
                id="left"
                type="source"
                position={Position.Left}
                className="-left-8 w-4 h-4 border-2 bg-blue-400/80"
            />

            <Handle
                id="top"
                type="source"
                position={Position.Top}
                className="-top-8 w-4 h-4 border-2 bg-blue-400/80"
            />
            <Handle
                id="bottom"
                type="source"
                position={Position.Bottom}
                className="-bottom-8 w-4 h-4 border-2 bg-blue-400/80"
            />
        </div>
    )

}