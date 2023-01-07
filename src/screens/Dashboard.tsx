import { useState } from "react";
import { FlatList, Text, VStack } from "native-base";


import { HomeHeader } from "../components/HomeHeader";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
import { UserProductsInfo } from "../components/UserProdutsInfo";


export function Dashboard() {

  const [Products, setProducts] = useState(['1','2','3','4','5','6'])

  return(
    <VStack flex={1} bg='gray.6' pt={16} px={6}>
      <HomeHeader/>

      <Text fontFamily='body' fontSize='sm' color='gray.3' mb={3}>
        Your on sale products
      </Text>

      <UserProductsInfo/>

      <Text fontFamily='body' fontSize='sm' color='gray.3' mb={3}>
        Products on sale
      </Text>

      <SearchBar/>
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