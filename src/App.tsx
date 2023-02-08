import ReactFlow, { addEdge, Background, Connection, ConnectionMode, Controls, Node, useEdgesState, useNodesState } from 'reactflow'
import { zinc } from 'tailwindcss/colors'
import 'reactflow/dist/style.css'
import { Square } from './components/nodes/Square'
import { useCallback, useState } from 'react'
import DefaultEdge from './components/edges/DefaultEdge'
import * as Toolbar from '@radix-ui/react-toolbar';
import { Circle } from './components/nodes/Circle'
import { Triangle } from './components/nodes/Triangle'
const NODE_TYPES = {
  square: Square,
  circle: Circle,
  triangle: Triangle
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 600,
      y: 200,
    },
    data: {}
  },
  {
    id: crypto.randomUUID(),
    type: 'triangle',
    position: {
      x: 200,
      y: 200,
    },
    data: {}
  }
]satisfies Node[]

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [activeNode, setActiveNode] = useState('')
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  function addSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 200,
          y: 200,
        },
        data: {}
      }
    ])
  }

  function addCircleNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'circle',
        position: {
          x: 500,
          y: 200,
        },
        data: {}
      }
    ])
  }

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  return (
    <div style={{
      width: '100vw',
      height: '100vh'
    }}>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onKeyDownCapture={(e) => e.key == 'Delete' && activeNode && setNodes(nds => nds.filter(node => node.id !== activeNode))}
        onNodeClick={(_, e) => setActiveNode(e.id)}
        onNodeContextMenu={(_, e) => console.log(e)}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background
          style={{
            background: '#000'
          }}
          gap={14}
          size={2}
          color={zinc[800]}
        />
        <Controls
          style={{
            background: '#fff',
            border: '1px solid white',
            padding: 4,
            borderRadius: 4,
            color: ''
          }}
        />
      </ReactFlow>


      <Toolbar.Root className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black rounded-2xl shadow-lg border border-white px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button onClick={addSquareNode} className="w-16 h-16 bg-gray-500 mt-6 rounded transition-transform hover:-translate-y-4" />
        <Toolbar.Button onClick={addCircleNode} className="ml-4 w-16 h-16 bg-red-500 mt-6 rounded-full transition-transform hover:-translate-y-4" />
        <Toolbar.Button onClick={addCircleNode} className="ml-4 w-16 h-16 bg-red-500 mt-6 rounded-full transition-transform hover:-translate-y-4" />
      </Toolbar.Root>
    </div>
  )
}

export default App
