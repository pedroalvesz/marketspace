import {Skeleton, VStack } from "native-base";


export function SkeletonCard() {
  return(
    <VStack w='155px'>
      <Skeleton w='full' h='100px' rounded='md' startColor='gray.7' endColor='gray.5'/>
      <Skeleton.Text mt={2} lines={2} startColor='gray.7' endColor='gray.5'/>
    </VStack>
  )
}