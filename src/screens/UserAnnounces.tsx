import { HStack, Icon, VStack, IconButton, Heading, Text, Select, FlatList } from "native-base";
import {AntDesign} from '@expo/vector-icons'
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";


export function UserAnnounces() {

  const [selectFilter, setSelectFilter] = useState('')
  const [Products, setProducts] = useState(['1','2','3','4','5','6'])

  return(
    <VStack flex={1} bg='gray.6' pt={16} px={6}>
      <HStack width='full' alignItems='center' justifyContent='space-between' mb={10}>
        <Heading fontFamily='heading' fontSize='xl' color='gray.1' flex={1} textAlign="center" ml={12}>
          My Announces
        </Heading>
        <IconButton
        icon={<Icon
          as={AntDesign}
          name='plus'
          size={7}
          color='gray.1'
          />}
        />
      </HStack>

      <HStack alignItems='center' justifyContent='space-between' mb={5}>
        <Text fontFamily='body' fontSize='sm' color='gray.2'>
          9 announces
        </Text>
        
        <Select placeholder="All" selectedValue={selectFilter} onValueChange={itemValue => setSelectFilter(itemValue)} minW='110px'>
          <Select.Item label='All' value='all'/>
          <Select.Item label='Active' value='active'/>
          <Select.Item label='Inactive' value='inactive'/>
        </Select>
      </HStack>

      <FlatList
      data={Products}
      keyExtractor={item => item}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      contentContainerStyle={{paddingBottom: 92}}
      showsVerticalScrollIndicator={false}
      renderItem={item => <ProductCard/>}
      />
    </VStack>
  )
}