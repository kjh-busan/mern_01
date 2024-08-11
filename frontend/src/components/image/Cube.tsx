/* eslint-disable react/no-unknown-property */
import React from 'react'
import { Box as ChackraBox } from '@chakra-ui/react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

const Cube = () => {
    const Box = (props: JSX.IntrinsicElements['mesh']) => {
        const ref = useRef<Mesh>(null!)

        useFrame(() => {
            ref.current.rotation.x += 0.01
        })

        return (
            <mesh ref={ref} scale={2} {...props}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh>
        )
    }

    return (
        <ChackraBox bg="black">
            {/* dpr은 디바이스 크기에 따라 반응형으로 보이도록 함 */}
            <Canvas dpr={[1, 2]}>
                {/* 빛이 없으면 아래에 박스 컬러가 그냥 검정으로 보임 */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Box position={[-3.2, 0, 0]} />
                <Box position={[4.2, 0, 0]} />
            </Canvas>
        </ChackraBox>
    )
}

export default Cube
